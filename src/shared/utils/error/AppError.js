class AppError extends Error {
    constructor({message, statusCode = 500, code = "INTERNAL_ERROR", type = "Error", details = []}) {
        super(message);

        this.statusCode = statusCode || 500;
        this.code = code || "INTERNAL_ERROR";
        this.type = type || "Error";
        this.details = details || [];
        this.timestamp = new Date().toISOString();
        
        Error.captureStackTrace(this, this.constructor);
    }

    static badRequest(message, details) {
        return new AppError({
            message: message || "Bad Request",
            statusCode: 400,
            code: "BAD_REQUEST",
            type: "BadRequestError",
            details: details || []
        })
    }
}

module.exports = AppError;