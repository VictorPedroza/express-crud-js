class AppError extends Error {
    constructor({message = "Internal Error", statusCode = 500, code = "INTERNAL_ERROR", type = "Error", details = []}) {
        super(message);

        this.statusCode = statusCode
        this.code = code 
        this.type = type
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