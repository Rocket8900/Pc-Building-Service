SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `cart` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `cart`;

DROP TABLE IF EXISTS `cart`;
CREATE TABLE IF NOT EXISTS `cart` (
  `cart_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `cart_item`;
CREATE TABLE IF NOT EXISTS `cart_item` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `cart_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `pc_name` varchar(50) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `FK_cart_id` (`cart_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

ALTER TABLE `cart_item`
  ADD CONSTRAINT `FK_cart_id` FOREIGN KEY (`cart_id`) REFERENCES `cart` (`cart_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

DROP TABLE IF EXISTS `parts_item`;
CREATE TABLE IF NOT EXISTS `parts_item` (
  `item_id_parts` int(11) NOT NULL,
  `parts_item_pri_key` int(11) NOT NULL AUTO_INCREMENT,
  `parts_id` int(11) NOT NULL,
  `parts_name` varchar(50) NOT NULL,
  `parts_price` int(11) NOT NULL,
  `quantity` int(11) NOT NULL,
  PRIMARY KEY (`parts_item_pri_key`),
  KEY `FK_parts_item` (`item_id_parts`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

ALTER TABLE `parts_item`
  ADD CONSTRAINT `FK_parts_item` FOREIGN KEY (`item_id_parts`) REFERENCES `cart_item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;