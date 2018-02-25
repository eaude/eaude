import { Router } from 'express'

import { 
  hydratePostCache, 
  checkPostCache, 
  buildPostsFromCache,
  getPostCountFromCache
} from './cache'

import { getTumblrPosts } from './services/tumblr'

const router = Router()

router.get('/posts', async function (req, res, next) {
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
})

export default router
