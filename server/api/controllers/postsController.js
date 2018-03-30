import { 
  hydratePostCache, 
  checkPostCache, 
  buildPostsFromCache,
  getPostCountFromCache,
  shouldFlush,
  flushCache
} from '../services/cache'

import { getTumblrPosts } from '../services/tumblr'

export const getPosts = async (req, res, next) => {
  try {
    const offset = Number(req.query.offset) || 0;
    const postKeys = Array.from(Array(5))
      .map((x, i) => `post:${offset + i}`)
    const timeToLive = process.env.cache_ttl || 28800000

    let hasCache = false
    // if its the first call and ttl has expired then we should flush
    if (offset === 0 && await shouldFlush(timeToLive)) {
      await flushCache()
    } else {
      hasCache = await checkPostCache(postKeys)
    }

    if (!hasCache) {  
      const blog = await getTumblrPosts(offset)
      await hydratePostCache(blog, offset)
    }

    const [count, posts] = await Promise.all([
      getPostCountFromCache(),
      buildPostsFromCache(postKeys)
    ])

    res.json({count , posts})
  } catch (err) {
    console.error(err)
  }
}