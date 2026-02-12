import userModel from "./userModel.js"; // Added .js extension
import bcrypt from 'bcrypt';

export const registerService = async (userData) => {
    const existingUser = await userModel.findOne({ email: userData.email });
    if (existingUser) {
     throw new Error('User with this email already exists');
    }
    
    const password  = userData.password;
    const hashedPassword = await bcrypt.hash(password, 10);
    userData.password = hashedPassword;
    const user = await userModel.create(userData);
    user.save();
    const token = user.generateAuthToken();
    user.token = token;
    return user;
};

export const loginService = async (userData) => {
    const User = await userModel.find({email : userData.email});
    if(!User){
        throw new Error('User Doesnt Exist');
    }
    const isPasswordValid = bcrypt.compare(userData.password,User.password);
    if(!isPasswordValid){
        throw new Error('Invalid Credentials');
    }
}