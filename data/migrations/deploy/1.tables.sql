BEGIN;

CREATE DOMAIN EMAIL AS TEXT CHECK ( value ~ '^[\w\-\.]+@([\w-]+\.)+[\w-]+$' );

CREATE DOMAIN PFLOAT AS FLOAT CHECK ( value > 0.0 );

CREATE TABLE IF NOT EXISTS customer 
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    EMAIL TEXT UNIQUE NOT NULL,
    family_name TEXT NOT NULL,
    first_name TEXT NOT NULL,
    date_of_birth TEXT,
    phone INT,
    address TEXT,
    zip_code INT,
    city TEXT,
    pwd TEXT
);

CREATE TABLE IF NOT EXISTS category 
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    category_name TEXT NOT NULL

);

CREATE TABLE IF NOT EXISTS review 
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    review TEXT NOT NULL,
    first_name TEXT NOT NULL,
    customer_id INT NOT NULL REFERENCES customer(id)
);

CREATE TABLE IF NOT EXISTS product 
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_name TEXT NOT NULL,
    price_without_taxes PFLOAT NOT NULL,
    product_info TEXT NOT NULL,
    product_image TEXT NOT NULL,
    prod_category_name TEXT,
    review_id INT NOT NULL REFERENCES review(id),
    category_id INT NOT NULL REFERENCES category(id)
);
CREATE TABLE IF NOT EXISTS shopping_cart 
(
    id INT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(), 
    customer_id INT NOT NULL REFERENCES customer(id),
    product_id INT NOT NULL REFERENCES product(id)
);

COMMIT;

