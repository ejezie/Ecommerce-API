import express from "express";
import dotenv from 'dotenv';
dotenv.config();
import { dbConnect } from "./configs/dbConnect.js";
import authRoute from "./routes/authRoutes.js";

dbConnect();

const PORT = process.env.PORT || 5000;

const app = express();

app.use('/api/user', authRoute)

app.listen(PORT, () => {
    console.log(`App is listening on port ${PORT}`)
})
