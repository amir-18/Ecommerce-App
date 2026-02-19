import express from 'express';
import userRoutes from './modules/user/userRoutes.js';
import paymentRoutes from './modules/payment/paymentRoutes.js';
import cartRoutes from './modules/cart/cartRoutes.js';
import productRoutes from './modules/product/productRoutes.js';
import errorHandler from './middlewares/errorHandler.js';
import cookieParser from 'cookie-parser';
const app = express();
export default app;

// MIDDLEWARES
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// ROUTES
app.use('/api/payment',paymentRoutes);
app.use('/api/users', userRoutes);
app.use('/api/product' , productRoutes);
app.use('/api/cart', cartRoutes);
// ERROR HANDLER (Must be last)
app.use(errorHandler);
