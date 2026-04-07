const { AppError } = require("@/shared/utils");
const { ProductModel } = require("@product/model");

/**
 * validateUpdateProduct - Middleware responsável por validar os dados de atualização de um produto.
 * 
 * @function validateUpdateProduct
 * 
 * @author Victor Pedroza <victor242206@gmail.com>
 * @since 2026-04-06
 * @version 1.0.0
 * 
 **/
const validateUpdateProduct = (req, res, next) => {
    try  {
        // Busca os dados do corpo da requisição e valida utilizando o schema do ProductModel, permitindo campos parciais
        const validateData = ProductModel.schema.partial().parse(req.body);

        // Se a validação for bem-sucedida, os dados validados são atribuídos de volta ao corpo da requisição
        req.body = validateData;

        // Chama o próximo middleware ou controlador na cadeia de execução
        next();
    } catch (err) {
        // Se ocorrer um erro de validação (ZodError), os erros são formatados e uma resposta de erro é enviada
        if (err.name === "ZodError") {
            // O erro é convertido de string JSON para um array de erros
            const errorList = JSON.parse(err.message);

            //  Os erros são formatados para incluir o campo e a mensagem de erro
            const formattedErrors = errorList.map((error) => ({
                field: error.path.join("."),
                message: error.message,
            }));

            // Uma resposta de erro é lançada utilizando o AppError, indicando que houve um erro na atualização do produto
            throw AppError.badRequest("Error to update product", formattedErrors);
        }        

        // Se ocorrer qualquer outro tipo de erro, um erro genérico é lançado
        throw new AppError();
    }
}

module.exports = validateUpdateProduct;