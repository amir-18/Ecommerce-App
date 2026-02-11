import { registerService } from './userService.js'; // Ensure .js is here

export const registerController = async (req, res, next) => {
    try {
        const userData = req.body;
        const user = await registerService(userData);
        res.cookie('token',user.token, {
            httpOnly : true,
            secure : process.env.NODE_ENV === 'production', // Only send cookie over HTTPS in production
            sameSite : 'strict', // CSRF protection
            maxAge : 7 * 24 * 60 * 60 * 1000, // 7 days
        }).status(200).json({
            message : 'User Registered Successfully',
            success : true
        });
    } catch (error) {
        next(error); // This sends the error to your global error handler
    }
};