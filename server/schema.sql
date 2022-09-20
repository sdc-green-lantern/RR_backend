
--id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

DROP TABLE IF EXISTS reviews_temp;
DROP TABLE IF EXISTS reviews;
DROP TABLE IF EXISTS review_photos;
DROP TABLE IF EXISTS characteristics;
DROP TABLE IF EXISTS characteristics_refs;

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
  'name' TEXT
);

-- psql rrdb < server/schema.sql

COPY reviews_temp FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/reviews.csv' DELIMITER ',' CSV HEADER;

COPY review_photos FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/reviews_photos.csv' DELIMITER ',' CSV HEADER;

COPY characteristics FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/characteristic_reviews.csv' DELIMITER ',' CSV HEADER;

COPY characteristics_refs FROM '/Users/mattwaelder/hackreactor/rfp2207-sdc/csv_files/characteristics.csv' DELIMITER ',' CSV HEADER;

INSERT INTO reviews SELECT
review_id, product_id, rating,
to_timestamp(cast(created_at/1000 as bigint))::date,
summary, body, recommend, reported, reviewer_name, reviewer_email, response,
helpfulness
FROM reviews_temp;

-- ALTER TABLE reviews ADD COLUMN photos jsonb;


-- INSERT INTO reviews(photos) VALUES((json_agg(review_photos) WHERE review_id IN ( )))

-- INSERT INTO reviews(photos) VALUES((SELECT * FROM review_photos WHERE review_photos.review_id = reviews.review_id))

--maybe just make a new table and add all these columns to it?

-- SELECT reviews.review_id, reviews.product_id, reviews.rating, reviews.created_at, reviews.summary, reviews.body, reviews.recommend, reviews.reported, reviews.reviewer_name, reviews.reviewer_email, reviews.response, reviews.helpfulness, review_photos.review_id, review_photos.url FROM reviews INNER JOIN review_photos ON reviews.review_id = review_photos.review_id;

-- (SELECT (json_agg(review_photos))
--   //     AS photos
--   //     FROM review_photos
--   //     WHERE review_photos.review_id = 5)

--   select (json_agg(review_photos)) from review_photos where review_photos.review_id = 5;


--create a new table with characteristics info

--this isnt happy bc foreign key must point to primary key, but review primary key is review_id, not product_id... may need to go back to no foreign key...
CREATE TABLE chars_full (
  characteristics jsonb DEFAULT NULL,
  ratings jsonb DEFAULT NULL,
  product_id INTEGER DEFAULT NULL,
  recommended jsonb DEFAULT NULL,
  -- CONSTRAINT fk_chars_full
    FOREIGN KEY (product_id)
      REFERENCES reviews(product_id)
);



INSERT INTO chars_full(product_id) VALUES((SELECT * FROM reviews));

--want to insert into ratings column of every row (every product) an object {1:x, 2:y, 3:z ,...} which is made from the ratings in the reviews table based off product_id as reference...

--select ratings from reviews where reviews.product_id = chars_full.product_id;

--SELECT COUNT(rating) FROM reviews where product_id=2 and rating = 4;

--THIS WORKS FOR ONE PRODUCT ID
INSERT INTO chars_full(ratings) VALUES ((json_build_object(
  1, (SELECT COUNT(rating) FROM reviews WHERE product_id=2 AND rating = 1),
  2, (SELECT COUNT(rating) FROM reviews WHERE product_id=2 AND rating = 2),
  3, (SELECT COUNT(rating) FROM reviews WHERE product_id=2 AND rating = 3),
  4, (SELECT COUNT(rating) FROM reviews WHERE product_id=2 AND rating = 4),
  5, (SELECT COUNT(rating) FROM reviews WHERE product_id=2 AND rating = 5)
)));