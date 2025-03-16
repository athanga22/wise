// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

const isAuthenticated = (req, res, next) => {
  //Get token from header
  const token = req.headers?.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'No token provided' });

  //Verify the token
  const verifyToken = jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
    if(err) {
      return false;
    } else {
      return decoded;
    }
  });

  if(verifyToken) {
    //Save the userId to process in next()
    req.id = verifyToken.userId;
    next();
  } else {
    const err = new Error("Token expired, login again");
    err.statusCode = 401;
    next(err);
  }
};

module.exports = isAuthenticated;
