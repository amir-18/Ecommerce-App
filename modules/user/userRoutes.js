import express from 'express';
import {registerController} from './userController.js';
const router = express.Router();
import validation from '../../middlewares/validate.js';
import {userCreateValidationSchema } from './userValidationSchema.js';
import { userLoginValidationSchema } from './userValidationSchema.js';

router.post('/register', validation(userCreateValidationSchema),registerController);
router.post('/login', validation(userLoginValidationSchema));

export default router;
