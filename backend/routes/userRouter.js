const express = require("express");
const userController = require("../controllers/userCtrl");
const userRouter = express.Router();

userRouter.post("/users/register", userController.register);
userRouter.post("/users/login", userController.login);

module.exports = userRouter;
