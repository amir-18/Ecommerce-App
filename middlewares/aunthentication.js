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

export const Authorized = (req,res,next) => {
    const token = generateToken(req,res);
    if(!token){
        return res.clearCookie('token').send('Please Login');
    }

    if(token.role !== 'Admin'){
        return res.send('You Arent Authenticated To Access This Route');
    }
    req.user = token;
    next();
    
};

// Verify JWT TOKEN
const generateToken = (req,res,next) => {
    const token = req.cookies.token;
    let data = null;
    if(!token){
        res.clearCookie();
       return data = false;
    }
    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET);
        data = decoded;
    }
    catch(error){
        data = false;
    }

    return data;
    
};

export const Authenticated = (req,res,next) => {
    const token = generateToken(req,res);
    if(!token){
        res.clearCookie('token').send('You Arent Authenticated To Access This Route')
    }
    req.user = token;
    next();
}