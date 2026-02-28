import express from 'express';
import { createProductController,deleteProductController,updateProductController,getProductsController } from './productController.js';
import {Authorized} from '../../middlewares/aunthentication.js';
import { productValidationSchema } from './productValidation.js';
import validation from '../../middlewares/validate.js';
const router  = express.Router();

router.post('/create',Authorized,validation(productValidationSchema),createProductController);
router.post('/products',getProductsController);
router.post('/delete/:productid',Authorized,deleteProductController);
router.post('/update/:productid',Authorized,updateProductController);
export default router;
