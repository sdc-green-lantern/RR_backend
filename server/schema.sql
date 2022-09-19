
--id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

DROP TABLE IF EXISTS reviews_temp;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS review_photos;
DROP TABLE IF EXISTS characteristics;

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
  -- review_id INTEGER NULL DEFAULT NULL,
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
  -- review_id INTEGER NULL DEFAULT NULL,
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

-- INSERT INTO reviews (id,product_id,review_id,created_at,reviewer_name,summary,body,rating,helpfulness,recommend,photos,response,reported) VALUES
-- ('1','2','3','4','5','6','7','8','9','0','1','2','3');
-- INSERT INTO reviews_meta (id,product_id,characteristics,ratings,recommended) VALUES
-- ('','','','','');


-- psql rrdb < server/schema.sql

COPY reviews_temp FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/reviews.csv' DELIMITER ',' CSV HEADER;

COPY review_photos FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/reviews_photos.csv' DELIMITER ',' CSV HEADER;

COPY characteristics FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

INSERT INTO reviews SELECT
review_id, product_id, rating,
to_timestamp(cast(created_at/1000 as bigint))::date,
summary, body, recommend, reported, reviewer_name, reviewer_email, response, helpfulness
FROM reviews_temp;
