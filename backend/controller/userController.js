import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  const userExist = await User.findOne({ email: email });

  if (!userExist) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exist");
  }
});

export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // Find user, check user exists
  const findUser = await User.findOne({ email });
  if(findUser && findUser.isPasswordMatch(password)){
    res.json(findUser);
  }else{
    res.status(401);
    throw new Error("Invalid Credentials");
  }
});
