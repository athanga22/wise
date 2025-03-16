const errHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message,
        stack: err.stack,   // this contains the file the error is occured and the line 
    })
};

module.exports = errHandler;