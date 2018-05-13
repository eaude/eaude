import { 
  hydratePostCache, 
  checkPostCache, 
  buildPostsFromCache,
  getPostCountFromCache,
  shouldFlush,
  flushCache,
  getPostKeysFromCache,
  setPostMetaData
} from '../services/cache'

import { getTumblrPosts } from '../services/tumblr'
import { INSPECT_MAX_BYTES } from 'buffer';

const recursivelyHyrdatePosts = (blog, cb, page = 1) => {
  console.log('hydrating')
  let maxPosts = 50
  let canNextPage = blog.posts.length >= maxPosts * page
  hydratePostCache(blog).then(() => {
    if (canNextPage) {
      const offset = maxPosts * (page - 1)
      cb(offset).then((blog) => {
        recursivelyHyrdatePosts(blog, cb, (page + 1))
      })
    }
  })
}

export const getPosts = async (req, res, next) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const timeToLive = process.env.cache_ttl || 28800000
    const postKeys = await getPostKeysFromCache(offset);

    const [count, posts] = await Promise.all([
      getPostCountFromCache(),
      buildPostsFromCache(postKeys)
    ])

    // if the length is less then 5 then call the api to check if new posts
    // this way the next posts won't load duplicates
    if (posts.length < 5) {
      getTumblrPosts(0).then((blog) => {
        
        if (Number(count) !== blog.total_posts || count > blog.total_posts) {
          recursivelyHyrdatePosts(blog, getTumblrPosts)
        }

      })
    }

    if (offset === 0 && await shouldFlush(timeToLive)) {
      await flushCache()
    }

    res.json({count, posts})
  } catch (err) {
    console.error(err)
  }
}