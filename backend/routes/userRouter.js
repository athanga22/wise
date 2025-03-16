const express = require("express");
const authMiddleware = require('../middlewares/authMiddleware');
const userController = require("../controllers/UserCtrl");
const userRouter = express.Router();

userRouter.post("/users/register", userController.register);
userRouter.post("/users/login", userController.login);
userRouter.get("/users/profile", authMiddleware, userController.getProfile);

module.exports = userRouter;
