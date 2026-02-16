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

export const Authenticated = (req,res,next) => {
    const token = req.cookies.token;
    if(!token){
        req.clearCookie();
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);

        if(decoded.role == 'Admin'){
            return next();
        }
        else{
            res.send('You Are Not Authenticated To Access This Route')
        }
    }
    catch(error){
        res.clearCookie();
        return next(error);
    }
    
}

