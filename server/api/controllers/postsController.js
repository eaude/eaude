import { 
  hydratePostCache, 
  checkPostCache, 
  buildPostsFromCache,
  getPostCountFromCache
} from '../services/cache'

import { getTumblrPosts } from '../services/tumblr'

export const getPosts = async (req, res, next) => {
  try {
    const offset = req.query.offset || 0;
    const postKeys = Array.from(Array(5))
      .map((x, i) => `post:${offset + i}`)

    let hasCache = await checkPostCache(postKeys)

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