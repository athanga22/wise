const express = require("express");
const userController = require("../controllers/userCtrl");
const userRouter = express.Router();

userRouter.post("/users/register", userController.register);

module.exports = userRouter;
