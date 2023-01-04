-- Revert f0fshop:1.tables from pg

BEGIN;

DROP INDEX email_idx;
DROP TABLE shopping_cart,product, review, category, customer;
DROP DOMAIN PFLOAT, EMAIL;

COMMIT;
