import express from 'express';
import { createProductController } from './productController.js';
import { productValidationSchema } from './productValidation.js';
import validation from '../../middlewares/validate.js';
const router  = express.Router();

router.post('/create',validation(productValidationSchema),createProductController);


export default router;
