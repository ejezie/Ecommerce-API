import User from "../models/userModel.js";

export const createUser = async (req, res) => {
  try {
    const email = req.body.email;
    const userExist = await User.findOne({ email: email });

    if (!userExist) {
      const newUser = User.create(req.body);
      res.json(newUser);
    } else {
      res.json({
        message: "User already exist",
        success: false,
      });
    }
  } catch (err) {
    res.json(err);
  }
};
