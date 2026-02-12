import { registerService } from './userService.js'; // Ensure .js is here
import { loginService } from './userService.js';
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

export const loginController = async (req,res,next) => {
    try{
        const userData = req.body;
        const user = await loginService(userData);
        const token = user.token;
        res.cookie('token',token, {
            httpOnly : true,
            sameSite : 'strict',
            secure : process.env.NODE_ENV === 'production',
            maxAge : 7 * 24 * 60 * 60 * 1000,
        }).status(200).json({
            message : 'User Logged In Successfully',
            success : true
        })
    }
    catch(error){
        next(error);
    }
};

export const logoutController =  (req,res) => {
    res.clearCookie('token').status(200).json({
        success : true,
        message : "User Logged Out Successfully"
    });
}