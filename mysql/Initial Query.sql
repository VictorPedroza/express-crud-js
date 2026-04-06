use railway;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    price DECIMAL(10,2) NOT NULL CHECK (price > 0 AND price < 1000000),
    category ENUM('Electronics', 'Clothing', 'Books', 'Home', 'Toys') NOT NULL,
    stock INT NOT NULL CHECK (stock >= 0),
    active BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE INDEX idx_products_active ON products(active);

INSERT INTO products (name, description, price, quantity, category) VALUES
('Smartphone', 'Smartphone Android 128GB', 2199.90, 25, 'Eletronicos');

SELECT * FROM products;