import express from 'express';
import {registerController} from './userController.js';
const router = express.Router();
import validation from '../../middlewares/validate.js';
import userValidationSchema from './userValidationSchema.js';

router.post('/register', validation(userValidationSchema),registerController);

export default router;
