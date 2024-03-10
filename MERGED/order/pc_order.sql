SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";

CREATE DATABASE IF NOT EXISTS `pc_order` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;
USE `pc_order`;

DROP TABLE IF EXISTS `pc_order`;
CREATE TABLE IF NOT EXISTS `pc_order` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `date` varchar(50) NOT NULL,
  `customer_id` varchar(50) NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

DROP TABLE IF EXISTS `order_item`;
CREATE TABLE IF NOT EXISTS `order_item` (
  `item_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `price` int(11) NOT NULL,
  `pc_name` varchar(50) NOT NULL,
  PRIMARY KEY (`item_id`),
  KEY `FK_order_id` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

ALTER TABLE `order_item`
  ADD CONSTRAINT `FK_order_id` FOREIGN KEY (`order_id`) REFERENCES `pc_order` (`order_id`) ON DELETE CASCADE ON UPDATE CASCADE;
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
  ADD CONSTRAINT `FK_parts_item` FOREIGN KEY (`item_id_parts`) REFERENCES `order_item` (`item_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;