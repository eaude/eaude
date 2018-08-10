import { Router } from 'express'

import { getPosts } from '../controllers/postsController'
const router = Router()

router.get('/', getPosts)
router.post('/create', () => {

})

// protected routes

export default router
