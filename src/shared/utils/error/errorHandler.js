const { env } = require("@/config/env");
const AppError = require("./AppError");

/**
 * errorHandler - Middleware de captura de Erros
 * 
 * @function errorHandler
 * 
 * @author VictorPedroza <victor.pedroza@protonmail.com>
 * @since 2026-04-03
 * @version 1.0.0
 * 
 **/ 
function errorHandler(err, req, res, next) {
  // Verifica o ambiente
  const isProd = env.environment === "production";

  // Se for um erro do tipo AppError retorna uma response personalizada
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
      timestamps: err.timestamp,
    });
  }

  // Se for um erro comum, retorna uma response base
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
