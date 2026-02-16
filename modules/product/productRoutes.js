import express from 'express';
import { createProductController,deleteProductController,updateProductController } from './productController.js';
import { productValidationSchema } from './productValidation.js';
import validation from '../../middlewares/validate.js';
const router  = express.Router();

router.post('/create',validation(productValidationSchema),createProductController);
router.post('/delete/:productid',deleteProductController);
router.post('/update/:productid',updateProductController);
export default router;
