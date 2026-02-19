import express from 'express';
import { checkoutController } from "./paymentController.js";
import { Authenticated } from "../../middlewares/aunthentication.js";
const router = express.Router();

router.post('/create-checkout/:productid',Authenticated,checkoutController);



export default router;