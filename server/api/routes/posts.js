import { Router } from 'express'
const router = Router()

import { getPosts } from '../controllers/postsController'

router.get('/posts', getPosts)

export default router
