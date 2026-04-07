const ProductRepository = require("./ProductRepository");

const { ProductModel } = require("@product/model");
const { database } = require("@config/database");

const productRepository = new ProductRepository(ProductModel, database);

module.exports = { productRepository };
