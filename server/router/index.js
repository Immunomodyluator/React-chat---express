import Router from 'express';
import userController from '../controllers/userController.js';
import { body } from 'express-validator';
import messageController from '../controllers/messageController.js';

const router = new Router();

router.post(
  '/registration',
  body('email').isEmail(),
  body('password').isLength({ min: 8, max: 32 }),
  body('login').isLength({ min: 3, max: 24 }),
  userController.registration
);

router.post('/login', userController.login);

router.post('/logout', userController.logout);

router.get('/refresh', userController.refresh);

router.post('/saveMessage', messageController.saveMessage);

router.get('/getMessage', messageController.getMessage);

export default router;
