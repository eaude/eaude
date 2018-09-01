import { Router } from 'express'
import passport from 'passport'

import { login, logout } from '../controllers/adminController'
// import { registerUser } from '../controllers/userController'

const router = Router()

router.post('/login', passport.authenticate('local'), login)
router.post('/logout', logout)

export default router
