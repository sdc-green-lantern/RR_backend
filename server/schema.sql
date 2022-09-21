
--id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS reviews_temp;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS review_photos;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS characteristics_refs;
DROP TABLE IF EXISTS chars_full;

CREATE TABLE product (
  id INTEGER,
  "name" TEXT,
  slogan TEXT,
  "description" TEXT,
  category TEXT,
  default_price INTEGER
);

CREATE TABLE reviews_temp (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NULL DEFAULT NULL,
  rating INTEGER,
  created_at BIGINT NULL DEFAULT NULL,
  summary TEXT NULL DEFAULT NULL,
  body TEXT NULL DEFAULT NULL,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR NULL DEFAULT NULL,
  reviewer_email VARCHAR NULL DEFAULT NULL,
  response TEXT NULL DEFAULT NULL,
  helpfulness VARCHAR NULL DEFAULT NULL
  -- photos jsonb
);

CREATE TABLE reviews (
  review_id SERIAL PRIMARY KEY,
  product_id INTEGER NULL DEFAULT NULL,
  rating INTEGER,
  created_at DATE NULL DEFAULT NULL,
  summary TEXT NULL DEFAULT NULL,
  body TEXT NULL DEFAULT NULL,
  recommend BOOLEAN,
  reported BOOLEAN,
  reviewer_name VARCHAR NULL DEFAULT NULL,
  reviewer_email VARCHAR NULL DEFAULT NULL,
  response TEXT NULL DEFAULT NULL,
  helpfulness VARCHAR NULL DEFAULT NULL
  -- photos jsonb
);

--id, review_id, url

CREATE TABLE review_photos (
  id SERIAL PRIMARY KEY,
  review_id INTEGER,
  "url" TEXT
);

CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  characteristic_id INTEGER,
  review_id INTEGER,
  val INTEGER
);

CREATE TABLE characteristics_refs (
  id SERIAL PRIMARY KEY,
  product_id INTEGER,
  "name" TEXT
);

CREATE TABLE chars_full (
  product_id INTEGER,
  star1 INTEGER,
  star2 INTEGER,
  star3 INTEGER,
  star4 INTEGER,
  star5 INTEGER,
  recommend_true INTEGER,
  recommend_false INTEGER
);

-- psql rrdb < server/schema.sql

COPY product FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/product.csv' DELIMITER ',' CSV HEADER;

COPY reviews_temp FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/reviews.csv' DELIMITER ',' CSV HEADER;

COPY review_photos FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/reviews_photos.csv' DELIMITER ',' CSV HEADER;

COPY characteristics FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

COPY characteristics_refs FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/characteristics.csv' DELIMITER ',' CSV HEADER;

-- COPY chars_full(product_id) FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/characteristics.csv' DELIMITER ',' CSV HEADER;

INSERT INTO reviews SELECT
review_id, product_id, rating,
to_timestamp(cast(created_at/1000 as bigint))::date,
summary, body, recommend, reported, reviewer_name, reviewer_email, response,
helpfulness
FROM reviews_temp;

INSERT INTO chars_full (product_id) SELECT id FROM product;

--create a new table with characteristics info

--this isnt happy bc foreign key must point to primary key, but review primary key is review_id, not product_id... may need to go back to no foreign key...

-- INSERT INTO chars_full SELECT product_id FROM reviews ;

-- INSERT INTO chars_full(star1) VALUES((select count(rating) FROM reviews WHERE product_id = chars_full.product_id AND reviews = 1));

-- UPDATE chars_full SET product_id = (SELECT product_id FROM reviews where reviews.id = chars_full.id;

-- -- ////////////////////

UPDATE chars_full SET star1 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 1);

--for that product, i want the number of reviews that recommend and the number of reviews that do not recommend
UPDATE chars_full SET recommend_true = (SELECT COUNT(recommend) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.recommend) RETURNING *;

--works for finding count of recommend and not for specific product
SELECT COUNT(recommend) FROM reviews WHERE reviews.product_id = 2 AND NOT  reviews.recommend;

-- -- ////////////////////

UPDATE chars_full SET star1 = (SELECT COUNT(ratings) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 1)

insert into chars_full(star1) VALUES((SELECT COUNT(ratings) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 1));

-- -- ////////////////////

--need to add as many product ids as exist in characteristics_refs to chars_full product ids


--select ratings from reviews where reviews.product_id = chars_full.product_id;

--SELECT COUNT(rating) FROM reviews where product_id=2 and rating = 4;

--THIS WORKS FOR ONE PRODUCT ID

-- INSERT INTO chars_full(ratings) VALUES ((json_build_object(
--   1, (SELECT COUNT(rating) FROM reviews WHERE product_id=2 AND rating = 1),
--   2, (SELECT COUNT(rating) FROM reviews WHERE product_id=2 AND rating = 2),
--   3, (SELECT COUNT(rating) FROM reviews WHERE product_id=2 AND rating = 3),
--   4, (SELECT COUNT(rating) FROM reviews WHERE product_id=2 AND rating = 4),
--   5, (SELECT COUNT(rating) FROM reviews WHERE product_id=2 AND rating = 5)
-- )));


--need to make table way bigger for each star and avgs for each characteristic and insert all one by one
-- simple queries just many of them to insert, where productid = productid