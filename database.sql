CREATE DATABASE order_database;

-- create user order db
CREATE TABLE user_order_data(
    orderID VARCHAR(255) PRIMARY KEY,
    user_id VARCHAR(255) NOT NULL,
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    orderStatus VARCHAR(10) NOT NULL
);

-- create order db
CREATE TABLE order_data(
    orderID VARCHAR(255),
    itemID SERIAL NOT NULL,
    quantity INT NOT NULL,
    pricePerItem DOUBLE PRECISION NOT NULL,
    PRIMARY KEY (orderID, itemID),
    FOREIGN KEY (orderID) REFERENCES user_order_data(orderID)
);
