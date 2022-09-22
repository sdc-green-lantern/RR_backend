
--id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

DROP TABLE IF EXISTS product;
DROP TABLE IF EXISTS reviews_temp;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS review_photos;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS characteristics_refs;
DROP TABLE IF EXISTS meta;

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

CREATE TABLE meta (
  product_id INTEGER,
  star1 INTEGER,
  star2 INTEGER,
  star3 INTEGER,
  star4 INTEGER,
  star5 INTEGER,
  recommend_true INTEGER,
  recommend_false INTEGER,

  comfort_id INTEGER DEFAULT NULL,
  quality_id INTEGER DEFAULT NULL,
  size_id INTEGER DEFAULT NULL,
  width_id INTEGER DEFAULT NULL,
  fit_id INTEGER DEFAULT NULL,
  length_id INTEGER DEFAULT NULL,

  comfort_avg INTEGER DEFAULT NULL,
  quality_avg INTEGER DEFAULT NULL,
  size_avg INTEGER DEFAULT NULL,
  width_avg INTEGER DEFAULT NULL,
  fit_avg INTEGER DEFAULT NULL,
  length_avg INTEGER DEFAULT NULL
);

-- psql rrdb < server/schema.sql

COPY product FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/product.csv' DELIMITER ',' CSV HEADER;

COPY reviews_temp FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/reviews.csv' DELIMITER ',' CSV HEADER;

COPY review_photos FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/reviews_photos.csv' DELIMITER ',' CSV HEADER;

COPY characteristics FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

COPY characteristics_refs FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/characteristics.csv' DELIMITER ',' CSV HEADER;

--indexes
CREATE INDEX reviews_product_id_idx ON "reviews"(product_id);

CREATE INDEX reviews_review_id_idx ON "reviews"(review_id);

CREATE INDEX reviews_temp_product_id_idx ON "reviews_temp"(product_id);

CREATE INDEX meta_product_id_idx ON "meta"(product_id);

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

INSERT INTO meta (product_id) SELECT id FROM product;

ALTER TABLE characteristics ADD COLUMN product_id INTEGER;

UPDATE characteristics SET product_id = (select product_id FROM reviews WHERE reviews.review_id = characteristics.review_id);

UPDATE meta SET star1 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = meta.product_id AND reviews.rating = 1);

UPDATE meta SET star2 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = meta.product_id AND reviews.rating = 2);

UPDATE meta SET star3 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = meta.product_id AND reviews.rating = 3);

UPDATE meta SET star4 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = meta.product_id AND reviews.rating = 4);

UPDATE meta SET star5 = (SELECT COUNT(rating) FROM reviews WHERE reviews.product_id = meta.product_id AND reviews.rating = 5);

UPDATE meta SET recommend_true = (SELECT COUNT(recommend) FROM reviews WHERE reviews.product_id = meta.product_id AND reviews.recommend);

UPDATE meta SET recommend_false = (SELECT COUNT(recommend) FROM reviews WHERE reviews.product_id = meta.product_id AND NOT reviews.recommend);
--

--want to isnert into each meta (product id)
--list of characteristics associated with that product
--list of characteristic id's associated with the chars
--average values for those charactersitics

--need to make table way bigger for each star and avgs for each characteristic and insert all one by one



---- TESTING ----

--review metadata for a given product

--maybe insert char id into respective column for each product, if nothing null
--for avg values of that data we can store it also in that column OR  do it later as a query?

-- SELECT characteristics_refs.name from characteristics_refs where product_id = 2;

-- --for every product in metas, we want to add ids to each comfort column

UPDATE meta SET comfort_id = (select characteristics.characteristic_id from characteristics where meta.product_id = (select product_id from reviews where reviews.review_id = characteristics.review_id));

select product_id from reviews where review_id = 5

select characteristics.characteristic_id from characteristics where meta.product_id = 5;

insert into meta(comfort_id) values ((select characteristics.characteristic_id from characteristics, meta where meta.product_id = (SELECT reviews.product_id from reviews where reviews.review_id = characteristics.review_id)));



UPDATE meta SET comfort_id = (SELECT characteristics.characteristic_id from characteristics where meta.product_id = characteristics.product_id AND ...);