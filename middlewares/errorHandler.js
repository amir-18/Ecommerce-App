import express from 'express';

const errorHandler = (err,req,res,next) => {
    const error = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';

    res.status(error).json({
        success: false,
        message: message,
    });
}

export default errorHandler;