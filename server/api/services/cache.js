const redis = require('redis')

export const client = redis.createClient(6379, process.env.REDIS_HOST)

client.on("error", function(err) {
  console.log("Error " + err);
})

export const shouldFlush = (time) => {
  return new Promise((resolve, reject) => {
    client.get('posts:ttl', (err, ttl) => {
      if (err) reject(err)
      const now = new Date().getTime()
      resolve((now - ttl) > time)
    })
  })
}

export const flushCache = () => {
  return new Promise((resolve, reject) => {
    client.flushall((err, res) => {
      if (err) reject (err)
      resolve(res)
    })
  })
}

export const checkPostCache = (postKeys, cb) => {
  return new Promise((resolve, reject) => {
    console.log(postKeys, 'postKeys')
    client.exists(...postKeys, (err, postCount) => {
      if (err) reject (err)
      console.log(postCount, 'post Count');
      resolve(cb(postCount))
    })
  })
}

const mapPairs = (pairs) => 
  pairs.map(([originalPost, altPhotos]) => 
    ({ originalPost, altPhotos }))

export const buildPostsFromCache = (keys) => {
  const posts = keys.map((key) => {
    return Promise.all([
      getOriginalPostFromCache(key),
      getAltPhotosFromCache(key)
    ])
  })
  return Promise.all(posts).then(pairs => mapPairs(pairs))
}

export const getPostKeysFromCache = (offset) => {
  return new Promise((resolve, reject) => {
    console.log('offset', offset)
    client.zrevrange('posts', offset, (offset + 4), (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export const getOriginalPostFromCache = (key) => {
  return new Promise((resolve, reject) => {
    client.hgetall(key, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export const getAltPhotosFromCache = (key) => {
  return new Promise((resolve, reject) => {
    client.zrange(`${key}:altPhotos`, 0, -1, (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
}

export const getPostCountFromCache = () => 
  new Promise((resolve, reject) => {
    client.get('posts:count', (err, data) => {
      if (err) reject(err)
      resolve(data)
    })
  })
 
export const setPostMetaData = (count) => {
  new Promise((resolve, reject) => {
    client.set('posts:count', count)
    client.set('posts:ttl', new Date().getTime())
    resolve(true)
  })
}

export const hydratePostCache = (blog, offset) => { 
  return new Promise((resolve, reject) => {
    
    const ids = blog.posts.map((post) => {
      return { id: post.id };
    })

    console.log('ids', ids);

    blog.posts.forEach((post, i) => {
      const photo = post.photos[0]
      const altSizes = photo.alt_sizes
      const current = offset+i
      
      // create a list of posts to reference
      client.zadd('posts', 0, post.id);

      client.hmset(post.id, {
        'caption': post.caption,
        'width': photo.original_size.width,
        'height': photo.original_size.height,
        'url': photo.original_size.url
      })

      Object.entries(altSizes)
        .forEach((entry) => {
          client.zadd(`${post.id}:altPhotos`, entry[0],  entry[1].url)
        })  
    })
    setPostMetaData(blog.total_posts)
    resolve(true)
  })
}

export default client