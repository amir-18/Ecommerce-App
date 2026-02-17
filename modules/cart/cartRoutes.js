import { addToCartController, removeCartController } from './cartController.js';
import express from 'express';

const router = express.Router();


router.post('/addCart/:productid', addToCartController);
router.delete('/removeCart/:productid', removeCartController);





export default router;
