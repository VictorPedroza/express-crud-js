const { AppError } = require("@shared/utils");

class ProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async create(data) {
    const existing = await this.productRepository.findByName(data.name);

    if (!existing.success) {
      throw AppError.badRequest("Product already exists");
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
