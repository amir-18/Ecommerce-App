import express from 'express';
import { createProductController,deleteProductController,updateProductController } from './productController.js';
import {Authenticated} from '../../middlewares/aunthentication.js';
import { productValidationSchema } from './productValidation.js';
import validation from '../../middlewares/validate.js';
const router  = express.Router();

router.post('/create',Authenticated,validation(productValidationSchema),createProductController);
router.post('/delete/:productid',Authenticated,deleteProductController);
router.post('/update/:productid',Authenticated,updateProductController);
export default router;
