import express from 'express';
import jwt from 'jsonwebtoken';

export const alreadyAuth =  (req,res,next) => {
    const token = req.cookies.token;

    if(!token){
        res.clearCookie();
        return next();
    }

    try{
        const verify = jwt.verify(token,process.env.JWT_SECRET);
        res.status(400).json({
            success : false,
            message : 'You are already logged in'
        })
    }
    catch(error){
        res.clearCookie('token');
        next();
    }
        }

