import { addToCartController, removeCartController, showItemsController } from './cartController.js';
import {Authenticated} from '../../middlewares/aunthentication.js';
import express from 'express';

const router = express.Router();


router.post('/addCart/:productid', Authenticated,  addToCartController);
router.delete('/removeCart/:productid', Authenticated,removeCartController);
router.get('/cartItems',Authenticated,showItemsController);





export default router;
