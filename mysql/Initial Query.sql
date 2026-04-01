use railway;

CREATE TABLE products (
    id INT AUTO_INCREMENT PRIMARY KEY,          -- Unique product identifier
    name VARCHAR(100) NOT NULL,                 -- Product name
    description TEXT,                           -- Detailed description
    price DECIMAL(10,2) NOT NULL,              -- Product price
    quantity INT DEFAULT 0,                     -- Stock quantity
    category VARCHAR(50),                       -- Product category
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP, -- Date of creation
    active BOOLEAN DEFAULT TRUE                 -- Is the product active?
);

INSERT INTO products (name, description, price, quantity, category) VALUES
('Smartphone', 'Smartphone Android 128GB', 2199.90, 25, 'Eletronicos');

SELECT * FROM products;