import { Router } from 'express'

import posts from './posts'

const router = Router()

// Add USERS Routes
router.use(posts)

export default router
