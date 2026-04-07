const { AppError } = require("@shared/utils");
const { productRepository } = require("@product/repositories");

/**
 * validateUpdateProduct - Middleware responsável por validar os dados de deletar um produto.
 * 
 * @function validateUpdateProduct
 * 
 * @author Victor Pedroza <victor242206@gmail.com>
 * @since 2026-04-07
 * @version 1.0.0
 * 
 **/
const validateDeleteProduct = async (req, res, next) => {
    // Busca o ID nos parametros da requisição
    const { id } = req.params;

    try {   
        // Busca o ID no BD
        const result = await productRepository.findById(parseInt(id));

        // Verifica se NÃO encontrou o produto
        if (!result.success || !result.data) {
            throw AppError.badRequest("ID Invalid. Product does not exists");
        }

        next();
    } catch (err) {
        // Se já for um AppError, repassa; senão, cria um erro genérico
        if (err instanceof AppError) {
            next(err);
        } else {
            throw new AppError("Internal server error");
        }
    }
}

module.exports = validateDeleteProduct;