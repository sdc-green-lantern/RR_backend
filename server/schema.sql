
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

--indexes
CREATE INDEX reviews_product_id_idx ON "reviews"(product_id);

CREATE INDEX chars_full_product_id_idx ON "chars_full"(product_id);

CREATE INDEX review_photos_review_id_idx ON "review_photos"(review_id);

CREATE INDEX characteristics_review_id_idx ON "characteristics"(review_id);

CREATE INDEX characteristics_refs_product_id_idx ON"characteristics_refs"(product_id);
--

--TRANSFORMATIONS AND INSERTS
INSERT INTO reviews SELECT
review_id, product_id, rating,
to_timestamp(cast(created_at/1000 as bigint))::date,
summary, body, recommend, reported, reviewer_name, reviewer_email, response,
helpfulness
FROM reviews_temp;

INSERT INTO chars_full (product_id) SELECT id FROM product;

UPDATE chars_full SET star1 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 1);

UPDATE chars_full SET star2 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 2);

UPDATE chars_full SET star3 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 3);

UPDATE chars_full SET star4 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 4);

UPDATE chars_full SET star5 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.rating = 5);

UPDATE chars_full SET recommend_true = (SELECT COUNT(recommend) FROM reviews WHERE reviews.product_id = chars_full.product_id AND reviews.recommend);

UPDATE chars_full SET recommend_false = (SELECT COUNT(recommend) FROM reviews WHERE reviews.product_id = chars_full.product_id AND NOT reviews.recommend);
--

--need to make table way bigger for each star and avgs for each characteristic and insert all one by one
-- simple queries just many of them to insert, where productid = productid