const express = require("express");
const userController = require("../controllers/UserCtrl");
const isAuthenticated = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.post("/users/register", userController.register);
userRouter.post("/users/login", userController.login);
userRouter.get("/users/profile", isAuthenticated, userController.getProfile);

module.exports = userRouter;
