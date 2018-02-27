import { Router } from 'express'

import posts from './routes/posts'

const router = Router()

router.use(posts)

export default router
