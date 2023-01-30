import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config({
  path: "backend/configs/config.env",
});

const URI = process.env.MONGO;
console.log(URI)

mongoose.set('strictQuery', false);
 
export const dbConnect = () => {
  try {
    mongoose.connect(URI);
    console.log("connection to database is sucessful!");
  } catch (err) {
    console.log("Data base connection failed");
  }
  return {}
};
