import express from 'express';
import {registerController} from './userController.js';
import {loginController} from './userController.js';
const router = express.Router();
import validation from '../../middlewares/validate.js';
import { userLoginValidationSchema, userCreateValidationSchema } from './userValidationSchema.js';

router.post('/register', validation(userCreateValidationSchema),registerController);
router.post('/login', validation(userLoginValidationSchema),loginController);


export default router;