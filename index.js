import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { dbConnect } from "./configs/dbConnect.js";
import authRoute from "./routes/authRoutes.js";
import bodyParser from "body-parser";
import { errorHandler, notFound } from "./middlewares/errorHandler.js";

dbConnect();

const PORT = process.env.PORT || 5000;

const app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

app.use("/api/user", authRoute);

app.use(notFound)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT}`);
});
