import userModel from "./userModel.js"; // Added .js extension

export const registerService = async (userData) => {
    const existingUser = await userModel.findOne({ email: userData.email });
    if (existingUser) {
        // This will be caught by the Controller's catch block
        throw new Error('User with this email already exists');
    }
    
    // You don't necessarily need a try/catch here if you're just re-throwing
    const user = await userModel.create(userData);
    return user;
};