const { AppError } = require("@shared/utils");

/**
 * ProductService - Classe de serviços que lidam com a regra de negócio da aplicação
 * 
 * @author Victor Pedroza <victor.pedroza@protonmail.com>
 * @since 2026-04-09
 * @version 1.0.0
 * 
 * @param {Object} productRepository - Repository de Produtos com funções de bases
 * 
 **/
class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  /**
   * create - Serviço para criar produto na aplicação
   * 
   * @param {Object} data - Objeto de dados do produto
   * @param {string} data.name - Nome do produto
   * @param {string} [data.description] - Descrição do Produto (Opcional)
   * @param {number} data.price - Preço do Produto
   * @param {string} data.category - Categoria do Produto {"Electronics" | "Clothing" | "Books" | "Home" | "Toys"}
   * @param {number} data.stock - Valor em estoque
   * 
   * @throws {AppError} Lança uma instância do AppError na aplicação
   * 
   * @returns {{success: boolean, message: string}} Retorna uma mensagem e o status da operação
   * 
   * @example
   * const result = await productService.create({ 
   *    name: "Produto", 
   *    price: 10, category: 
   *    "Eletronics", 
   *    stock: 10 
   * });
   * 
   * if (result.success) {
   *    console.log(result.message)
   * }
   * 
   **/
  async create(data) {
    const existing = await this.productRepository.findByName(data.name);

    if (existing.success) {
      throw AppError.badRequest("Product already exists", { data: existing.data });
    }

    const result = await this.productRepository.create(data);

    if (!result.success) {
      throw AppError.badRequest("Error creating product");
    }

    return {
      success: true,
      message: "Product created successfully"
    };
  }
}

module.exports = ProductService;
