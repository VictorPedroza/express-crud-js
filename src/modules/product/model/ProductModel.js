const { z } = require("zod");

const ProductSchema = z.object({
  name: z
    .string("Name must be a string")
    .min(3, "Product name must be at least 3 characters long")
    .max(100, "Product name must be at most 100 characters long")
    .trim(),

  description: z
    .string("Description must be a string")
    .min(10, "Product description must be at least 10 characters long")
    .max(1000, "Product description must be at most 1000 characters long")
    .optional(),

  price: z
    .number("Price must be a number")
    .positive("Price must be a positive number")
    .max(1000000, "Price must be less than 1,000,000"),

  category: z.enum(["Electronics", "Clothing", "Books", "Home", "Toys"], "Category invalid."),

  stock: z
    .number("Stock must be a number")
    .int("Stock must be an integer")
    .nonnegative("Stock cannot be negative"),

  active: z.boolean().default(true)
});

const ProductUpdateSchema = ProductSchema.partial();

const ProductModel = {
  tableName: "products",
  schema: ProductSchema,
  updateSchema: ProductUpdateSchema,
  timestamps: true,
  hiddenFields: [],
};

module.exports = ProductModel;