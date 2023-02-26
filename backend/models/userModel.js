import mongoose from "mongoose";
import bcrypt from "bcrypt";
import validator from "validator";

const { Schema, model } = mongoose;

// Declare the Schema of the Mongo model
const userSchema = new Schema({
  firstname: {
    type: String,
    required: [true, "Please enter your first name"],
    maxLength: [30, "First name cannot exceed 30 characters"],
  },
  lastname: {
    type: String,
    required: [true, "Please enter your last name"],
    maxLength: [30, "Last name cannot exceed 30 characters"],

  },
  email: {
    type: String,
    required: [true, "please enter your email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  avater: {
    public_id: {
      type: String,
      required: true,
    },
    url: {
      type: String,
      required: true,
    }
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
    minLenght: [6, "Password must be at least 6 characters"],
    select: false,
  },
});

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSaltSync(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Define a Schema method
userSchema.methods.isPasswordMatch = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword, this.password);
};


//Export the model
export default model("User", userSchema); 
