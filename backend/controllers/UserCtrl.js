const asyncHandler = require("express-async-handler");
const User = require("../models/userschema");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const userController = {
  //Register
  register: asyncHandler(async (req, res) => {

    const { name, email, password, profilePic } = req.body;
    // console.log(req.body);
    //Validate the user
    if(!name || !email || !password) {
        throw new Error("(*)All fields are mandatory");
    }

    //Check if user exists already
    const existingUser = await User.findOne({ email });
    if(existingUser) {
        throw new Error("User already exists. Please login!")
    }

    //Hash the user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //Create the user and save it into the DB
    const newUser = await User.create({
        name,
        email,
        password: hashedPassword,
        profilePic
    })

    //Send the response
    res.status(201).json({
        message: "User Registered successfully!",
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
    });
  }),

  //Login
  login: asyncHandler(async (req, res) => {

    const { email, password } = req.body;
    if (!email || !password) {
      throw new Error("Email and password are required.");
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new Error("User not found. Please register first!");
    }


    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
      throw new Error("Invalid password.");
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "1d" }
    );

    res.json({
      message: "Login successful!",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  })
};

module.exports = userController;