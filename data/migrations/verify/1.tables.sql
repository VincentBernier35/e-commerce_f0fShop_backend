-- Verify f0fshop:1.tables on pg

BEGIN;

select * from category;
select * from customer;
select * from product;
select * from review;
select * from shopping_cart;

ROLLBACK;
