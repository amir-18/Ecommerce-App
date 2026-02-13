import express from 'express';
import { createProductController } from './productController.js';
const router  = express.Router();

router.post('/create',createProductController);


export default router;
