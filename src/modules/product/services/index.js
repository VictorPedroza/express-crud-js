const ProductService = require("./ProductService");
const { productRepository } = require("../repositories")

const productService = new ProductService(productRepository);

module.exports = { productService }