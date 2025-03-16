const asyncHandler = require("express-async-handler");
const User = require("../models/userschema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userController = {
  //Register
  register: asyncHandler(async (req, res, next) => {
    const { name, email, password, profilePic } = req.body;
    // console.log(req.body);
    //Validate the user
    if (!name || !email || !password) {
      return next({ statusCode: 400, message: "All fields are required." });
    }

    //Check if user exists already
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return next({
        statusCode: 409,
        message: "User already exists. Please login!",
      });
    }

    //Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create the user and save it into the DB
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      profilePic,
    });

    //Send the response
    res.status(201).json({
      message: "User Registered successfully!",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  }),

  //Login
  login: asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;
    if (!email || !password) {
      return next({
        statusCode: 400,
        message: "Email and password are required.",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return next({
        statusCode: 404,
        message: "User not found. Please register first!",
      });
    }

    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      return next({ statusCode: 401, message: "Incorrect credentials." });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
      expiresIn: "1d",
    });

    res.status(200).json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }),

  //Get Profile
  getProfile: asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.id).select("-password");
    if (!user) {
      return next({ statusCode: 404, message: "User not found." });
    }
    res.status(200).json({
      message: "User profile fetched successfully!",
      user,
    });
  }),

  //Update user details
  updateUser: asyncHandler(async (req, res, next) => {
    const { name, email, password, profilePic } = req.body;
    const userId = req.id;

    //Find the user
    const user = await User.findById(userId);
    if (!user) {
      return next({ statusCode: 404, message: "User not Found." });
    }

    // Check if email already exists for another user
    if (email && email !== user.email) {
      const emailExists = await User.findOne({ email });
      if (emailExists) {
        return next({ statusCode: 409, message: "Email already in use." });
      }
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) user.email = email;
    if (profilePic) user.profilePic = profilePic;

    // Hash password if provided
    if (password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);
    }

    await user.save();

    res.status(200).json({
      message: "User details updated successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  }),
};

module.exports = userController;
