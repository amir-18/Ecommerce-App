import joi from 'joi';

const userValidationSchema = joi.object({
    fullname : joi.string().required(),
    username : joi.string().required(),
    age : joi.number().required(),
    email : joi.string().email().required(),
    password : joi.string().min(6).required(),
});
export default userValidationSchema;