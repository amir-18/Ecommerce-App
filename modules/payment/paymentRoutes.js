import express from 'express';
import { checkoutController, cartCheckoutController } from "./paymentController.js";
import { Authenticated } from "../../middlewares/aunthentication.js";
const router = express.Router();

router.post('/create-checkout/:productid',Authenticated,checkoutController);
router.post('/cartCheckout',Authenticated,cartCheckoutController);


export default router;