import { addToCartController } from './cartController.js';
import express from 'express';

const router = express.Router();


router.post('/addCart/:productid', addToCartController);






export default router;
