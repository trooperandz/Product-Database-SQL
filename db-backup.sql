-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: bamazon_db
-- ------------------------------------------------------
-- Server version	5.7.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `department`
--

DROP TABLE IF EXISTS `department`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `department` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `dept_name` varchar(45) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `overhead_cost` decimal(17,2) NOT NULL,
  `product_sales` decimal(17,2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `department`
--

LOCK TABLES `department` WRITE;
/*!40000 ALTER TABLE `department` DISABLE KEYS */;
INSERT INTO `department` VALUES (1,'Electronics','2016-10-18 16:49:20',2500.00,11376.46),(2,'Landscapes','2016-10-18 16:49:20',35000.00,243964156.04),(3,'Spacecraft','2016-10-18 16:49:20',40000.00,3608601.48),(4,'Propulsion','2016-10-18 16:49:20',23000.00,1700010.00),(5,'Famous Figures','2016-10-18 16:49:20',12000.00,945099.61),(6,'Supernatural Stuff','2016-10-22 02:44:57',36500.00,6452.50),(8,'Furry Friends','2016-10-22 15:41:16',30000.00,0.00);
/*!40000 ALTER TABLE `department` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-22 20:50:38

-- MySQL dump 10.13  Distrib 5.7.12, for osx10.9 (x86_64)
--
-- Host: 127.0.0.1    Database: bamazon_db
-- ------------------------------------------------------
-- Server version	5.7.15

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `product`
--

DROP TABLE IF EXISTS `product`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `product` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `prod_name` varchar(45) NOT NULL,
  `dept_id` int(11) NOT NULL,
  `price` decimal(10,2) NOT NULL,
  `stock_qty` int(11) NOT NULL,
  `create_date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=latin1;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product`
--

LOCK TABLES `product` WRITE;
/*!40000 ALTER TABLE `product` DISABLE KEYS */;
INSERT INTO `product` VALUES (1,'RD-180',4,1500000.00,9,'2016-10-18 17:05:26'),(2,'NK-33',4,500000.00,13,'2016-10-18 17:05:26'),(3,'RD-170',4,850000.00,8,'2016-10-18 17:05:26'),(4,'Gravity-Pro',1,1253.16,7,'2016-10-18 17:05:26'),(5,'Laser-Slinger',1,850.11,8,'2016-10-18 17:05:26'),(6,'Hover-Pro',1,1683.54,30,'2016-10-18 17:05:26'),(7,'Mt. Sneffles',2,20000546.35,412,'2016-10-18 17:05:26'),(8,'Grand Canyon',2,80546385.13,8,'2016-10-18 17:05:26'),(9,'Cappadocia',2,104568.25,12,'2016-10-18 17:05:26'),(10,'Dodge Niahlist',3,450352.28,24,'2016-10-18 17:05:26'),(11,'Echelon Infinitum',3,2804853.15,28,'2016-10-18 17:05:26'),(12,'Gradium Falconium',3,1568903.45,10,'2016-10-18 17:05:26'),(13,'Nikola Tesla',5,2890458.13,30,'2016-10-18 17:05:26'),(14,'Count Basie',5,358904.56,32,'2016-10-18 17:05:26'),(15,'John Candy',5,320528.12,6,'2016-10-18 17:05:26'),(16,'Lake Baikal',2,1245.34,195,'2016-10-21 15:34:22'),(17,'Oscar Peterson',2,1234524.34,25,'2016-10-21 15:38:38'),(18,'George Shearing',2,965423.21,12,'2016-10-21 15:40:14'),(19,'Lotus Lander',3,453243.90,12,'2016-10-21 15:54:19'),(20,'Grenadine Spinner',3,345000.45,10,'2016-10-21 15:56:41'),(21,'Poltergeist',6,3200.15,14,'2016-10-22 03:07:00'),(22,'Out Of Body Experience',6,645.25,12,'2016-10-22 03:10:18'),(23,'Possession',6,1950.34,15,'2016-10-22 03:11:45'),(27,'Albert Einstein',5,235000.13,10,'2016-10-22 15:35:15'),(28,'Buffalo River',2,345213.14,10,'2016-10-22 15:40:07');
/*!40000 ALTER TABLE `product` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2016-10-22 16:26:50
