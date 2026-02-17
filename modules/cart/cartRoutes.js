import { addToCartController, removeCartController } from './cartController.js';
import {Authenticated} from '../../middlewares/aunthentication.js';
import express from 'express';

const router = express.Router();


router.post('/addCart/:productid', Authenticated,  addToCartController);
router.delete('/removeCart/:productid', Authenticated,removeCartController);





export default router;
