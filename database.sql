CREATE DATABASE order_database;

-- create order db
CREATE TABLE order_data(
    orderID SERIAL PRIMARY KEY,
    itemID SERIAL NOT NULL,
    quantity INT NOT NULL,
    PricePerItem DOUBLE PRECISION NOT NULL,
    CreatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    OrderStatus VARCHAR(10) NOT NULL
);