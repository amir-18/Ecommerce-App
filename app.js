import express from 'express';
import userRoutes from './modules/user/userRoutes.js';

const app = express();
export default app;

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({extended : true}));

// ROUTES
app.use('/api/users', userRoutes);
