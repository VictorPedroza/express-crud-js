const { AppError } = require("@shared/utils");
const { productRepository } = require("@product/repositories");

const validateDeleteProduct = async (req, res, next) => {
    const { id } = req.params;

    try {
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