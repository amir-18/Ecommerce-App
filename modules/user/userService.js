import userModel from "./userModel";

export const registerService = async (userData) => {
    const existingUser = await userModel.findOne({email : userData.email});
    if(existingUser){
        throw new Error('User with this email already exists');
    };
    try{
        const user = await userModel.create(userData);
        return user;
    }
    catch(error){
        throw error;
    }
} 