-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'reviews'
--
-- ---

--id,product_id,rating,date,summary,body,recommend,reported,reviewer_name,reviewer_email,response,helpfulness

--date looks like: 1610178433963

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NULL DEFAULT NULL,
  rating INTEGER,
  "date" BIGINT NULL DEFAULT NULL,
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
DROP TABLE IF EXISTS review_photos;

CREATE TABLE review_photos (
  id SERIAL PRIMARY KEY,
  review_id TEXT,
  "url" TEXT
);

-- ---
-- Table 'reviews_meta'
--
-- ---



--id,characteristic_id,review_id,value
-- DROP TABLE IF EXISTS reviews_meta;

-- CREATE TABLE reviews_meta (
--   id SERIAL PRIMARY KEY,
--   product_id INTEGER NULL DEFAULT NULL,
--   characteristics jsonb,
--   ratings jsonb,
--   recommended jsonb
-- );

DROP TABLE IF EXISTS characteristics;


CREATE TABLE characteristics (
  id SERIAL PRIMARY KEY,
  characteristic_id TEXT,
  review_id TEXT,
  value INTEGER
)

-- ---
-- Foreign Keys
-- ---


-- ---
-- Table Properties
-- ---

-- ALTER TABLE `reviews` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;
-- ALTER TABLE `reviews_meta` ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- ---
-- Test Data
-- ---

-- INSERT INTO reviews (id,product_id,review_id,created_at,reviewer_name,summary,body,rating,helpfulness,recommend,photos,response,reported) VALUES
-- ('1','2','3','4','5','6','7','8','9','0','1','2','3');
-- INSERT INTO reviews_meta (id,product_id,characteristics,ratings,recommended) VALUES
-- ('','','','','');


-- psql rrdb < server/schema.sql