const { env } = require("@/config/env");
const AppError = require("./AppError");

function errorHandler(err, req, res, next) {
  const isProd = env.environment === "production";

  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: "error",
      statusCode: err.statusCode,
      message: err.message,
      error: {
        code: err.code,
        type: err.type,
        details: err.details,
      },
      ...(isProd ? {} : { stack: err.stack }),
      timestamps: new Date().toISOString(),
    });
  }

  if (!(err instanceof AppError)) {
    return res.status(500).json({
      status: "error",
      statusCode: 500,
      message: "Internal Server Error",
      error: {
        code: "INTERNAL_SERVER_ERROR",
        type: "Internal Server Error",
        details: [],
      },
      ...(isProd ? {} : { stack: err.stack }),
      timestamps: new Date().toISOString(),
    });
  }

  next();
}

module.exports = errorHandler;
