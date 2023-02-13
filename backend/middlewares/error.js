import ErrorHandler from "../utils/errorHandler.js";

// Not found error handler
// export const notFound = (req, res, next) => {
//   const error = new Error(`Not found: ${req.originalUrl}`);
//   res.status(404);
//   next(error);
// };

// export const errorHandler = (err, req, res, next) => {
//     const statuscode = res.statusCode== 200 ? 500 : res.statusCode;
//     res.status(statuscode);
//     res.json({
//         message: err?.message,
//         stack: err?.stack
//     })
// }

export default (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;

  if (process.env.NODE_ENV === "DEVELOPMENT") {
    res.status(err.statusCode).json({
      success: false,
      error: err,
      errMessage: err.message,
      errStack: err.stack,
    });
  }

  if (process.env.NODE_ENV === "PRODUCTION") {
    let error = {...err};
    error.message = err.message;

    // Handling wrong mongoose Id Error
    if (err.name === "CastError") {
      const message = `Resource not found. Invalid:  ${err.path}`;
      error = new ErrorHandler(message, 400);
    }

    // Handling mongooose validation error
    if(err.name === "ValidationError") {
      const message = Object.values(err.errors).map(value => value.message);
      error = new ErrorHandler(message, 400);
    }

    res.status(err.statusCode).json({
      success: false,
      message: error.message,
    });
  }
};
