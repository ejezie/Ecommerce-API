import mongoose from "mongoose";
import bcrypt from "bcrypt";

const { Schema, model } = mongoose;

// Declare the Schema of the Mongo model
const userSchema = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  mobile: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

userSchema.pre("save", async function(next) {
    const salt = await bcrypt.genSaltSync(10)
    this.password = bcrypt.hash(this.password, salt)
})

//Export the model
export default model("User", userSchema);
