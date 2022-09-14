-- ---
-- Globals
-- ---

-- SET SQL_MODE="NO_AUTO_VALUE_ON_ZERO";
-- SET FOREIGN_KEY_CHECKS=0;

-- ---
-- Table 'reviews'
--
-- ---

DROP TABLE IF EXISTS `reviews`;

CREATE TABLE `reviews` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `product_id` INTEGER NULL DEFAULT NULL,
  `review_id` INTEGER NULL DEFAULT NULL,
  `date` DATETIME NULL DEFAULT NULL,
  `reviewer_name` VARCHAR NULL DEFAULT NULL,
  `summary` VARCHAR(60) NULL DEFAULT NULL,
  `body` VARCHAR(1000) NULL DEFAULT NULL,
  `rating` VARCHAR NULL DEFAULT NULL,
  `helpfulness` VARCHAR NULL DEFAULT NULL,
  `recommend` BINARY NULL DEFAULT NULL COMMENT 'boolean',
  `photos` VARCHAR NULL DEFAULT NULL,
  `response` VARCHAR(1000) NULL DEFAULT NULL,
  `reported` BINARY NULL DEFAULT NULL COMMENT 'boolean',
  PRIMARY KEY (`id`)
);

-- ---
-- Table 'reviews_meta'
--
-- ---

DROP TABLE IF EXISTS `reviews_meta`;

CREATE TABLE `reviews_meta` (
  `id` INTEGER NULL AUTO_INCREMENT DEFAULT NULL,
  `product_id` INTEGER NULL DEFAULT NULL,
  `characteristics` VARCHAR NOT NULL DEFAULT 'NULL',
  `ratings` VARCHAR NULL DEFAULT NULL,
  `recommended` VARCHAR NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
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


--how do i apply this schema do my db? with a command? with a function?