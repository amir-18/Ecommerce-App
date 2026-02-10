import express from 'express';
import userRoutes from './modules/user/userRoutes.js';
import errorHandler from './middlewares/errorHandler.js';

const app = express();
export default app;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// ROUTES
app.use('/api/users', userRoutes);

// ERROR HANDLER (Must be last)
app.use(errorHandler);
