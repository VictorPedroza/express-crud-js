/**
 * AppError - Instância de base de Erro da Aplicação
 * 
 * @class
 * 
 * @author Victor Pedroza <victor.pedroza@protonmail.com>
 * @since 2026-03-04
 * @version 1.0.0
 * 
 * @extends {Error} Classe com base no Error
 * 
 **/
class AppError extends Error {
    /**
     * 
     * @typedef AppError
     * 
     * @param {Object} data - Parametros do AppError
     * @param {string} data.message - Mensagem de erro
     * @param {number} data.statusCode - Código do Status do Erro
     * @param {string} data.code - Código do Erro
     * @param {string}  data.type - Tipo de Erro
     * @param {any[]} data.details - Lista de detalhes do erro
     * 
     **/
    constructor({message = "Internal Error", statusCode = 500, code = "INTERNAL_ERROR", type = "Error", details = []}) {
        super(message);

        this.statusCode = statusCode
        this.code = code 
        this.type = type
        this.details = details || [];
        this.timestamp = new Date().toISOString();
        
        Error.captureStackTrace(this, this.constructor);
    }

    /**
     * badRequest - Instância do Erro (400)
     * 
     * @method badRequest
     * 
     * @param {string} message - Mensagem do Erro
     * @param {any[]} [deails] - Detalhes do Erro
     * 
     * @returns {AppError} Instância do AppError com status 400
     * 
     **/
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