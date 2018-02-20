import { Router } from 'express'

import {getTumblrPosts} from './services/tumblr'

const router = Router()

router.get('/posts', async function (req, res, next) {
  try {
    const offset = req.query.offset || 0;
    const posts = await getTumblrPosts(offset)
    res.json(posts)
  } catch (err) {
    console.error(err)
  }
})

export default router
