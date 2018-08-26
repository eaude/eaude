import { Router } from 'express'

import { getPosts, createPost, getUploadUrl } from '../controllers/postsController'
const router = Router()

router.get('/', getPosts)

// Todo protect route
router.get('/get-upload-url', getUploadUrl)
router.post('/create', createPost)

// protected routes

export default router
