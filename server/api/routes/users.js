import { Router } from 'express'

import { registerUser } from '../controllers/userController'
const router = Router()

// TODO: Protect route
router.post('/create', registerUser)

export default router
