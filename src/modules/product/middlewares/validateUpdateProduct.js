import { AppError } from "@/shared/utils";
import { ProductModel } from "@product/model";

const validateUpdateProduct = (req, res, next) => {
    try  {
        const validateData = ProductModel.schema.partial().parse(req.body);

        req.body = validateData;
        next();
    } catch (err) {
        if (err.name === "ZodError") {
            const errorList = JSON.parse(err.message);

            const formattedErrors = errorList.map((error) => ({
                field: error.path.join("."),
                message: error.message,
            }));

            throw AppError.badRequest("Error to update product", formattedErrors);
        }        
        throw new AppError();
    }
}

module.exports = validateUpdateProduct;