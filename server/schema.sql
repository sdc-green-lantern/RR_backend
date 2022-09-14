-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'reviews'
--
-- ---

DROP TABLE IF EXISTS reviews;

CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NULL DEFAULT NULL,
  review_id INTEGER NULL DEFAULT NULL,
  created_at DATE NULL DEFAULT NULL,
  reviewer_name VARCHAR NULL DEFAULT NULL,
  summary VARCHAR(60) NULL DEFAULT NULL,
  body TEXT NULL DEFAULT NULL,
  rating INTEGER,
  helpfulness VARCHAR NULL DEFAULT NULL,
  recommend BOOLEAN,
  photos jsonb,
  response TEXT NULL DEFAULT NULL,
  reported BOOLEAN
);

-- ---
-- Table 'reviews_meta'
--
-- ---

DROP TABLE IF EXISTS reviews_meta;

CREATE TABLE reviews_meta (
  id SERIAL PRIMARY KEY,
  product_id INTEGER NULL DEFAULT NULL,
  characteristics jsonb,
  ratings jsonb,
  recommended jsonb
);

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

-- INSERT INTO `reviews` (`id`,`product_id`,`review_id`,`date`,`reviewer_name`,`summary`,`body`,`rating`,`helpfulness`,`recommend`,`photos`,`response`,`reported`) VALUES
-- ('','','','','','','','','','','','','');
-- INSERT INTO `reviews_meta` (`id`,`product_id`,`characteristics`,`ratings`,`recommended`) VALUES
-- ('','','','','');
