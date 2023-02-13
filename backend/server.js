import express from "express";
import dotenv from "dotenv";
dotenv.config({
  path: "backend/configs/config.env",
});
import { dbConnect } from "./configs/dbConnect.js";
import authRoute from "./routes/authRoutes.js";
import productRoute from "./routes/productRoute.js";
import bodyParser from "body-parser";
import errorMiddleWare from "./middlewares/error.js";

dbConnect();

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(`ERROR: ${err.stack}`);
  console.log('shutting down due to uncaughtException');
  process.exit(1);
})

const PORT = process.env.PORT || 5000;
const ENV = process.env.NODE_ENV;

const app = express();

app.use(bodyParser());
app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cors());

app.use("/api/v1/", authRoute);
app.use("/api/v1/", productRoute);

// Error handling middleware
app.use(errorMiddleWare)

const server = app.listen(PORT, () => {
  console.log(`App is listening on port ${PORT} in ${ENV} mode`);
});

// Handle promise rejections

process.on('unhandledRejection', err => {
  console.log(`Error: ${err.message}`);
  console.log("shutting down server due to unhandledRejection");
  server.close(() => {
    process.exit(1);
  })
})