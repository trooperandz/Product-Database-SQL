CREATE TABLE product (
	id INTEGER(11) NOT NULL AUTO_INCREMENT,
    prod_name VARCHAR(45) NOT NULL,
    dept_name VARCHAR(45) NOT NULL,
    price DECIMAL(7,2) NOT NULL,
    stock_qty INTEGER(11) NOT NULL,
    create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id));

 CREATE TABLE department (
	id INTEGER(11) NOT NULL AUTO_INCREMENT,
    dept_name VARCHAR(45) NOT NULL,
    create_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (id));

INSERT INTO department (dept_name)
VALUES ('Electronics'), ('Landscapes'), ('Spacecraft'), ('Propulsion'), ('Famous Figures');

INSERT INTO product (prod_name, dept_id, price, stock_qty)
VALUES ('RD-180', 4, 1500000, 12), ('NK-33', 4, 500000, 15), ('RD-170', 4, 850000, 14),
	   ('Gravity-Pro', 1, 1253.16, 20), ('Laser-Slinger', 1, 850.11, 25), ('Hover-Pro', 1, 1683.54, 35),
       ('Mt. Sneffles', 2, 20000546.35, 4), ('Grand Canyon', 2, 80546385.13, 6), 
       ('Cappadocia', 2, 104568.25, 12), ('Dodge Niahlist', 3, 450352.28, 36),
       ('Echelon Infinitum', 3, 2804853.15, 28), ('Gradium Falconium', 3, 1568903.45, 16),
       ('Nikola Tesla', 5, 2890458.13, 18), ('Count Basie', 5, 358904.56, 32), 
       ('John Candy', 5, 320528.12, 23);