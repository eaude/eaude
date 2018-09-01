import { s3 } from '../services/s3'
import uuid from 'uuid/v1'
import mongoose from 'mongoose'

const Post = mongoose.model('Post')

export const getUploadUrl = async (req, res) => {
  // return url from amazon to the client for image upload
  // this saves $$$ by allowing the client to upload and not the server
  const folder = 'images-regular'
  const key = `${folder}/${uuid()}.jpg`;
  const bucket = 'eaude-blog-images'

  try {
    const url = await new Promise((resolve, reject) => {
      s3.getSignedUrl('putObject', {
        Bucket: bucket,
        ContentType: 'image/jpeg',
        Key: key,
        Expires: 10000
      }, (err, data) => {
        if (err) { return reject(err) }
        return resolve(data)
      })
    })

    res.send(buildPost(url, key, bucket))
  } catch (error) {
    res.sendStatus(400, 'Image could not be uploaded to S3 bucket')
  }
}

const splitURL = (url, key) => {
  const bucketUrl = url.split(key, 1)[0]
  return {
    bucketUrl,
    key
  }
}

const buildPost = (url, key, bucket) => ({ uploadUrl: url, imageUrl: splitURL(url, key), bucket })

export const createPost = (req, res) => {
  const { caption, image: { imageUrl, size, bucket }} = req.body
  const post = new Post({ 
    caption, 
    image: {
      ...imageUrl,
      size
    }
  })
  
  return new Promise((resolve, reject) => {
    post.save((err) => {
      if (err) { return reject(err) }
      resolve(true)
    })
  })

  .then(() => {
    return res.sendStatus(201)
  })

  .catch((err) => {
    deleteImageFromBucket(bucket, imageUrl.key).then((data) => {
      res.status(400).send({ message: 'error saving post image removed from s3 bucket' })
    }).catch((err) => {
      res.status(400).send({ message: 'error saving post could not delete image from bucket', error: err })
    })
  })
}

const deleteImageFromBucket = (bucket, key) => {
  return new Promise((resolve, reject) => {
    s3.deleteObject({ Bucket: bucket, Key: key }, (err, data) => {
      if (err) { return reject(err) }
      return resolve(data)
    })
  }) 
}

export const getPosts = async (req, res) => {
  try {
    const count = Post.estimatedDocumentCount().exec()
    const skip = req.query.page ? req.query.page * 10 : 0
    const limit = skip + 10
    const posts = Post
      .find({})
      .skip(skip)
      .limit(limit)
      .sort('-created_at')
      .exec()
    
    const [ resolvedPosts, resolvedCount ] = await Promise.all([ posts, count ])

    return res.status(200).json({ posts: resolvedPosts, count: resolvedCount });

  } catch (error) {
    // todo handle error
    res.status(400).send({ message: error.message })
    console.error(error)
  }
}

export const deletePost = () => {

}

// const recursivelyHyrdatePosts = (blog, cb, page = 1) => {
//   let maxPosts = 50
//   let canNextPage = blog.posts.length >= maxPosts * page
//   hydratePostCache(blog).then(() => {
//     if (canNextPage) {
//       const offset = maxPosts * (page - 1)
//       cb(offset).then((blog) => {
//         recursivelyHyrdatePosts(blog, cb, (page + 1))
//       })
//     }
//   })
// }

// export const getPosts = async (req, res, next) => {
//   try {
//     const offset = Number(req.query.offset) || 0;
//     const timeToLive = process.env.cache_ttl || 28800000
//     const postKeys = await getPostKeysFromCache(offset);

//     const [count, posts] = await Promise.all([
//       getPostCountFromCache(),
//       buildPostsFromCache(postKeys)
//     ])

//     // if the length is less then 5 then call the api to check if new posts
//     // this way the next posts won't load duplicates
//     if (posts.length < 5) {
//       getTumblrPosts(0).then((blog) => {
//         // if photo has been added or delete then flush and rehydrate
//         if (Number(count) !== blog.total_posts || Number(count) > blog.total_posts) {
//           flushCache().then(() => {
//             recursivelyHyrdatePosts(blog, getTumblrPosts)
//           })
//         }
//       })
//     }

//     if (offset === 0 && await shouldFlush(timeToLive)) {
//       await flushCache()
//     }

//     res.json({count, posts})
//   } catch (err) {
//     console.error(err)
//   }
// }
