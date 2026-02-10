import express from 'express';
import {registerController} from '../userController.js';
const router = express.Router();


router.post('api/user/register', registerController);

export default router;
