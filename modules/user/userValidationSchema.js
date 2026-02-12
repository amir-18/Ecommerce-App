import joi from 'joi';

export const userCreateValidationSchema = joi.object({
    fullname : joi.string().required(),
    username : joi.string().required(),
    age : joi.number().required(),
    email : joi.string().email().required(),
    password : joi.string().min(6).required(),
});

export const userLoginValidationSchema = joi.object({
    email : joi.string().required(),
    password : joi.string().required(),
});