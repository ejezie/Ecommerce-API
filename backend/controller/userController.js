import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import ErrorHandler from "../utils/errorHandler.js";
import catchAsyncErrors from "../middlewares/catchAsyncErrors.js";

// Register user => api/v1/register
export const createUser = catchAsyncErrors(async (req, res) => {
  const {firstname, lastname, email, password} = req.body;
  const userExist = await User.findOne({ email: email });

  if (!userExist) {
    const newUser = await User.create({
      firstname, 
      lastname, 
      password,
      email,
      avater: {
        public_id: "",
        url: "",
      }
    });
    res.json(newUser);
  } else {
    throw new Error("User already exist");
  }
});

export const loginUser = catchAsyncErrors(async (req, res) => {
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
