import {Router} from 'express'
const router = Router()

import authController from '../controllers/auth.controller.js'
import validations from '../validations/auth.js'

// /api/auth

router.get('/ping', (req, res) => {
    res.json({pong: true})
})

router.post(
    '/register',
    validations.registration,
    authController.registration,

)

router.post(
    '/login',
    validations.login,
    authController.login
)

export default router