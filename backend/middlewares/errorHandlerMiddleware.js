const errHandler = (err, req, res, next) => {
    res.json({
        message: err.message,
        stack: err.stack,   // this contains the file the error is occured and the line 
    })
};

module.exports = errHandler;