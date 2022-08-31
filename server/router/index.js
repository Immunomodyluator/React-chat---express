import Router from 'express'
import userController from '../controllers/userController.js'
import { body } from 'express-validator'

const router = new Router()

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 32 }),
  body('login').isLength({ min: 3, max: 24 }),
  userController.registration
)

router.post('/login', userController.login)

router.post('/logout', userController.logout)

router.get('/refresh', userController.refresh)

export default router
