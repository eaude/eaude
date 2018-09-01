import { Router } from 'express'

import posts from './posts'
import admin from './admin'
import users from './users'

const router = Router()

router.use(admin)
router.use('/posts', posts)
router.use('/users', users)

export default router
