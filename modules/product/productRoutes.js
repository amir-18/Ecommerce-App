import express from 'express';
import { createProductController,deleteProductController } from './productController.js';
import { productValidationSchema } from './productValidation.js';
import validation from '../../middlewares/validate.js';
const router  = express.Router();

router.post('/create',validation(productValidationSchema),createProductController);
router.post('/delete/:productid',deleteProductController);
export default router;
