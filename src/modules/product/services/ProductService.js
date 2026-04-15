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

  async getProducts() {
    const result = await this.productRepository.findAll();

    if (result.data.length === 0) {
      throw AppError.badRequest("Not found products");
    }

    return { success: true, data: result.data };
  }

  /**
   * create - Serviço para criar produto na aplicação
   *
   * @param {Object} data - Objeto de dados do produto
   * @param {string} data.name - Nome do produto
   * @param {string} [data.description] - Descrição do Produto (Opcional)
   * @param {number} data.price - Preço do Produto
   * @param {string} data.category - Categoria de Produtos {"Electronics" | "Clothing" | "Books" | "Home" | "Toys"}
   * @param {number} data.stock - Valor em estoque
   *
   * @throws {AppError} Lança uma instância do AppError na aplicação
   *
   * @returns {{success: boolean, message: string}} Retorna uma mensagem e o status da operação
   *
   * @example
   * const result = await productService.
   *    name: "Produto",
   *    price: 10,
   *    category: "Eletronics",
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
      throw AppError.badRequest("Product already exists", {
        data: existing.data,
      });
    }

    const result = await this.productRepository.create(data);

    if (!result.success) {
      throw new AppError({
        message: result.error,
      });
    }

    return {
      success: true,
      message: "Product created successfully",
    };
  }

  /**
   * update - Serviço de atualização de produto
   *
   * @async
   * @function update
   *
   * @param {number} id - Identificador do produto
   * @param {Object} data - Dados a serem alterados do produto
   *
   * @return {<{success: boolean, message: string, data: Object}>} Retorna uma mensagem de status da operação, uma mensagem e os dados alterados
   *
   * @throws {AppError} Retorna os erros baseado na regra de negócio
   *
   **/
  async update(id, data) {
    const parsedId = parseInt(id, 10);

    const existing = await this.productRepository.findById(parsedId);

    if (!existing.success) {
      throw new AppError({
        message: result?.error,
      });
    }

    if (!existing.data) {
      throw AppError.badRequest("Product not exists", {
        id: parsedId,
      });
    }

    if (!data || Object.keys(data).length === 0) {
      throw AppError.badRequest("No data provided for update");
    }

    const result = await this.productRepository.update(id, data);
    if (!result.success) {
      throw AppError.badRequest("Error updating produc", {
        error: result?.error,
      });
    }

    return {
      success: true,
      message: "Product updated successfully.",
      data: result.data,
    };
  }
}

module.exports = ProductService;
