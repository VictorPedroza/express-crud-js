const { AppError } = require("@/shared/utils");
const { ProductModel } = require("@product/model");

const validateCreateProduct = (req, res, next) => {
  try {
    const validateData = ProductModel.schema.parse(req.body);

    req.body = validateData;
    next();
  } catch (err) {
    if (err.name === "ZodError") {
      const errorList = JSON.parse(err.message);

      const formattedErrors = errorList.map((error) => ({
        field: error.path.join("."),
        message: error.message,
      }));

      throw AppError.badRequest("Error to create product", formattedErrors);
    }

    throw new AppError();
  }
};

module.exports = validateCreateProduct;
