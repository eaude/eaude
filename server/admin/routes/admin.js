import { Router } from 'express'
const router = Router()

import { admin } from '../controllers/adminController'

// 
router.get('/', admin)

export default router
