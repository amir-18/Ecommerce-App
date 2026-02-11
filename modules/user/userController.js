import { registerService } from './userService.js'; // Ensure .js is here

export const registerController = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await registerService(userData);
        res.status(201).json({
            data: user,
            success: true,
            message: 'User Registered Successfully'
        });
    } catch (error) {
        next(error); // This sends the error to your global error handler
    }
};