const asyncHandler = require("express-async-handler");
const User = require("../models/userschema");
const bcrypt = require('bcryptjs');

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
    res.json({
        name: newUser.name,
        email: newUser.email,
        id: newUser._id,
    });
  }),

  //Login
};

module.exports = userController;
