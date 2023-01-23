import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

export const createUser = asyncHandler(async (req, res) => {
  const email = req.body.email;
  console.log(req.body, "***********");
  const userExist = await User.findOne({ email: email });

  if (!userExist) {
    const newUser = await User.create(req.body);
    res.json(newUser);
  } else {
    throw new Error("User already exist");
  }
});
