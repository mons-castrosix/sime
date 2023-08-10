/*
SQLyog Community v13.2.0 (64 bit)
MySQL - 10.4.22-MariaDB : Database - sime
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
CREATE DATABASE /*!32312 IF NOT EXISTS*/`sime` /*!40100 DEFAULT CHARACTER SET utf8mb4 */;

USE `sime`;

/*Table structure for table `apoyo` */

DROP TABLE IF EXISTS `apoyo`;

CREATE TABLE `apoyo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `apaterno` varchar(150) DEFAULT NULL,
  `amaterno` varchar(150) DEFAULT NULL,
  `nombres` varchar(200) DEFAULT NULL,
  `calle` varchar(150) DEFAULT NULL,
  `numero` varchar(45) DEFAULT NULL,
  `colonia` varchar(150) DEFAULT NULL,
  `cp` varchar(45) DEFAULT NULL,
  `ciudad` varchar(150) DEFAULT NULL,
  `clave_elector` varchar(150) DEFAULT NULL,
  `curp` varchar(150) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `seccion` varchar(150) DEFAULT NULL,
  `distrito_federal` int(5) DEFAULT NULL,
  `distrito_local` int(5) DEFAULT NULL,
  `nivel` int(5) DEFAULT NULL,
  `no_celular` varchar(150) DEFAULT NULL,
  `email` varchar(500) NOT NULL,
  `facebook` varchar(400) DEFAULT NULL,
  `twitter` varchar(500) DEFAULT NULL,
  `otra_red` varchar(500) DEFAULT NULL,
  `contacto` varchar(200) DEFAULT NULL,
  `no_celcontacto` varchar(45) DEFAULT NULL,
  `lat` decimal(10,8) NOT NULL,
  `lng` decimal(11,8) NOT NULL,
  `img` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `img` (`img`),
  CONSTRAINT `img` FOREIGN KEY (`img`) REFERENCES `img_ine` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4;

/*Data for the table `apoyo` */

insert  into `apoyo`(`id`,`apaterno`,`amaterno`,`nombres`,`calle`,`numero`,`colonia`,`cp`,`ciudad`,`clave_elector`,`curp`,`fecha_nacimiento`,`seccion`,`distrito_federal`,`distrito_local`,`nivel`,`no_celular`,`email`,`facebook`,`twitter`,`otra_red`,`contacto`,`no_celcontacto`,`lat`,`lng`,`img`) values 
(47,'CASTRO','SIXTOS','MONSERRAT ALEJANDRA','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','CSSXMN98121116M100','CASM981211MMNSXN09','1998-12-11','1263',8,16,1,'45548456','monsesin1211@gmail.com','ssaads','asdadad','aadad','asasdas','454564546',19.70354734,-101.27057282,453);

/*Table structure for table `apoyos` */

DROP TABLE IF EXISTS `apoyos`;

CREATE TABLE `apoyos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `descripcion` varchar(800) NOT NULL,
  `tipo` varchar(45) NOT NULL,
  `monto` int(8) NOT NULL,
  `alcance` varchar(200) NOT NULL,
  `id_persona` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `id_persona` (`id_persona`) USING BTREE,
  CONSTRAINT `apoyos_ibfk_1` FOREIGN KEY (`id_persona`) REFERENCES `apoyo` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8mb4;

/*Data for the table `apoyos` */

insert  into `apoyos`(`id`,`descripcion`,`tipo`,`monto`,`alcance`,`id_persona`) values 
(14,'asdasdsad','Económico',500,'Personal',47);

/*Table structure for table `asociacion_civil` */

DROP TABLE IF EXISTS `asociacion_civil`;

CREATE TABLE `asociacion_civil` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  `cargo` varchar(500) NOT NULL,
  `id_lider` int(11) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `asociacion_civil` */

/*Table structure for table `cargo_casilla` */

DROP TABLE IF EXISTS `cargo_casilla`;

CREATE TABLE `cargo_casilla` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `cargo_casilla` */

/*Table structure for table `cargo_escuela` */

DROP TABLE IF EXISTS `cargo_escuela`;

CREATE TABLE `cargo_escuela` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre_escuela` varchar(500) DEFAULT NULL,
  `cargo` varchar(500) NOT NULL,
  `id_lider` int(11) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `cargo_escuela` */

insert  into `cargo_escuela`(`id`,`nombre_escuela`,`cargo`,`id_lider`) values 
(1,'fds','',28),
(2,'gtfr','',29),
(3,'sdcf','',30),
(4,'FF','',33),
(5,'GERGR','',35);

/*Table structure for table `cargo_maestro` */

DROP TABLE IF EXISTS `cargo_maestro`;

CREATE TABLE `cargo_maestro` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `cargo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `cargo_maestro` */

/*Table structure for table `casillas_cont` */

DROP TABLE IF EXISTS `casillas_cont`;

CREATE TABLE `casillas_cont` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(250) DEFAULT NULL,
  `nomenclatura` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4;

/*Data for the table `casillas_cont` */

insert  into `casillas_cont`(`id`,`numero`,`nomenclatura`) values 
(1,'01','C01'),
(2,'02','C02'),
(3,'03','C03'),
(4,'04','C04'),
(5,'05','C05'),
(6,'06','C06'),
(7,'07','C07'),
(8,'08','C08'),
(9,'09','C09'),
(10,'10','C10'),
(11,'11','C11'),
(12,'12','C12'),
(13,'13','C13'),
(14,'14','C14'),
(15,'15','C15'),
(16,'16','C16'),
(17,'17','C17'),
(18,'18','C18'),
(19,'19','C19'),
(20,'20','C20');

/*Table structure for table `casillas_esp` */

DROP TABLE IF EXISTS `casillas_esp`;

CREATE TABLE `casillas_esp` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(250) DEFAULT NULL,
  `nomenclatura` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*Data for the table `casillas_esp` */

insert  into `casillas_esp`(`id`,`numero`,`nomenclatura`) values 
(1,'01','SMR01'),
(2,'02','SMR02'),
(3,'03','SMR03'),
(4,'04','SMR04'),
(5,'05','SM405');

/*Table structure for table `casillas_ext` */

DROP TABLE IF EXISTS `casillas_ext`;

CREATE TABLE `casillas_ext` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(250) DEFAULT NULL,
  `nomenclatura` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `casillas_ext` */

insert  into `casillas_ext`(`id`,`numero`,`nomenclatura`) values 
(1,'01','E01'),
(2,'02','E02'),
(3,'03','E03'),
(4,'04','E04');

/*Table structure for table `casillas_extcont` */

DROP TABLE IF EXISTS `casillas_extcont`;

CREATE TABLE `casillas_extcont` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `numero` varchar(250) DEFAULT NULL,
  `nomenclatura` varchar(250) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=41 DEFAULT CHARSET=utf8mb4;

/*Data for the table `casillas_extcont` */

insert  into `casillas_extcont`(`id`,`numero`,`nomenclatura`) values 
(1,'Extraordinaria 01 Contigua 01','E01C01'),
(2,'Extraordinaria 01 Contigua 02','E01C02'),
(3,'Extraordinaria 01 Contigua 03','E01C03'),
(4,'Extraordinaria 01 Contigua 04','E01C04'),
(5,'Extraordinaria 01 Contigua 05','E01C05'),
(6,'Extraordinaria 01 Contigua 06','E01C06'),
(7,'Extraordinaria 01 Contigua 07','E01C07'),
(8,'Extraordinaria 01 Contigua 08','E01C08'),
(9,'Extraordinaria 01 Contigua 09','E01C09'),
(10,'Extraordinaria 01 Contigua 10','E01C10'),
(11,'Extraordinaria 02 Contigua 01','E02C01'),
(12,'Extraordinaria 02 Contigua 02','E02C02'),
(13,'Extraordinaria 02 Contigua 03','E02C03'),
(14,'Extraordinaria 02 Contigua 04','E02C04'),
(15,'Extraordinaria 02 Contigua 05','E02C05'),
(16,'Extraordinaria 02 Contigua 06','E02C06'),
(17,'Extraordinaria 02 Contigua 07','E02C07'),
(18,'Extraordinaria 02 Contigua 08','E02C08'),
(19,'Extraordinaria 02 Contigua 09','E02C09'),
(20,'Extraordinaria 02 Contigua 10','E02C10'),
(21,'Extraordinaria 03 Contigua 01','E03C01'),
(22,'Extraordinaria 03 Contigua 02','E03C02'),
(23,'Extraordinaria 03 Contigua 03','E03C03'),
(24,'Extraordinaria 03 Contigua 04','E03C04'),
(25,'Extraordinaria 03 Contigua 05','E03C05'),
(26,'Extraordinaria 03 Contigua 06','E03C06'),
(27,'Extraordinaria 03 Contigua 07','E03C07'),
(28,'Extraordinaria 03 Contigua 08','E03C08'),
(29,'Extraordinaria 03 Contigua 09','E03C09'),
(30,'Extraordinaria 03 Contigua 10','E03C10'),
(31,'Extraordinaria 04 Contigua 01','E04C01'),
(32,'Extraordinaria 04 Contigua 02','E04C02'),
(33,'Extraordinaria 04 Contigua 03','E04C03'),
(34,'Extraordinaria 04 Contigua 04','E04C04'),
(35,'Extraordinaria 04 Contigua 05','E04C05'),
(36,'Extraordinaria 04 Contigua 06','E04C06'),
(37,'Extraordinaria 04 Contigua 07','E04C07'),
(38,'Extraordinaria 04 Contigua 08','E04C08'),
(39,'Extraordinaria 04 Contigua 09','E04C09'),
(40,'Extraordinaria 04 Contigua 10','E04C10');

/*Table structure for table `cat_tenencia` */

DROP TABLE IF EXISTS `cat_tenencia`;

CREATE TABLE `cat_tenencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) DEFAULT NULL,
  `id_cat_municipio` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

/*Data for the table `cat_tenencia` */

insert  into `cat_tenencia`(`id`,`nombre`,`id_cat_municipio`) values 
(1,'Morelos','1'),
(2,'Jesús del Monte','1'),
(3,'Capula','1'),
(4,'Puerto de Buenavista','1'),
(5,'San Antonio','1'),
(6,'Bosque Monarca','1'),
(7,'San Nicolás Obispo','1'),
(8,'San Juanito Itzicuaro','1'),
(9,'El Durazno','1'),
(10,'Atapaneo','1'),
(11,'Tiripetío','1');

/*Table structure for table `domicilio_iglesia` */

DROP TABLE IF EXISTS `domicilio_iglesia`;

CREATE TABLE `domicilio_iglesia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `calle` varchar(500) NOT NULL,
  `no_ext` varchar(100) NOT NULL,
  `colonia` varchar(500) NOT NULL,
  `fiesta_patronal` date NOT NULL,
  `id_lider` int(11) NOT NULL,
  KEY `id` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `domicilio_iglesia` */

/*Table structure for table `equipo` */

DROP TABLE IF EXISTS `equipo`;

CREATE TABLE `equipo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `equipo` */

insert  into `equipo`(`id`,`nombre`) values 
(1,'Cuarto de guerra'),
(2,'Electoral'),
(3,'Jurídico'),
(4,'Contable'),
(5,'Organización'),
(6,'Movilización'),
(7,'Territorial'),
(8,'Redes Sociales'),
(9,'Otro');

/*Table structure for table `img_ine` */

DROP TABLE IF EXISTS `img_ine`;

CREATE TABLE `img_ine` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `ruta` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=522 DEFAULT CHARSET=utf8mb4;

/*Data for the table `img_ine` */

insert  into `img_ine`(`id`,`ruta`) values 
(1,'http://127.0.0.1:3000/images/1669160544532--i'),
(2,'1669160957468--ine1.jpeg'),
(3,'1669160986518--ine1.jpeg'),
(4,'1669161038072--ine1.jpeg'),
(5,'1669164885108--ine1.jpeg'),
(6,'1669165200883--ine1.jpeg'),
(7,'1669165268357--ine1.jpeg'),
(8,'1669165300446--ine1.jpeg'),
(9,'1669165321538--ine1.jpeg'),
(10,'1669165599264--ine1.jpeg'),
(11,'1669165614240--ine1.jpeg'),
(12,'1669165948769--ine1.jpeg'),
(13,'1669229947888--ine1.jpeg'),
(14,'1669230018082--ine1.jpeg'),
(15,'1669230074783--ine1.jpeg'),
(16,'1669230092519--ine1.jpeg'),
(17,'1669230246410--ine1.jpeg'),
(18,'1669230665151--ine1.jpeg'),
(19,'1669230706965--ine1.jpeg'),
(20,'1669230817918--ine1.jpeg'),
(21,'1669246733481--ine1.jpeg'),
(22,'1669246770975--ine1.jpeg'),
(23,'1669246904486--ine1.jpeg'),
(24,'1669247124486--ine1.jpeg'),
(25,'1669247281519--ine1.jpeg'),
(26,'1669247364207--ine1.jpeg'),
(27,'1669247648206--ine1.jpeg'),
(28,'1669247724925--ine1.jpeg'),
(29,'1669247768449--ine1.jpeg'),
(30,'1669247917686--ine1.jpeg'),
(31,'1669247964385--ine1.jpeg'),
(32,'1669248106475--ine1.jpeg'),
(33,'1669248646331--ine1.jpeg'),
(34,'1669248671681--ine1.jpeg'),
(35,'1669248770369--ine1.jpeg'),
(36,'1669248802117--ine1.jpeg'),
(37,'1669248825832--ine1.jpeg'),
(38,'1669248863495--ine1.jpeg'),
(39,'1669249363192--ine.jpeg'),
(40,'1669249639549--ine.jpeg'),
(41,'1669249677450--ine.jpeg'),
(42,'1669249797875--ine.jpeg'),
(43,'1669250030377--ine.jpeg'),
(44,'1669250149964--ine.jpeg'),
(45,'1669250175250--ine.jpeg'),
(46,'1669250321565--ine.jpeg'),
(47,'1669250427977--ine1.jpeg'),
(48,'1669250480714--ine1.jpeg'),
(49,'1669250593729--ine1.jpeg'),
(50,'1669250718899--ine1.jpeg'),
(51,'1669250758292--ine1.jpeg'),
(52,'1669250791691--ine1.jpeg'),
(53,'1669250824619--ine1.jpeg'),
(54,'1669250903380--ine.jpeg'),
(55,'1669250937219--ine.jpeg'),
(56,'1669251020132--ine.jpeg'),
(57,'1669251114507--ine.jpeg'),
(58,'1669251240945--ine.jpeg'),
(59,'1669251292415--ine.jpeg'),
(60,'1669251465009--ine.jpeg'),
(61,'1669251523060--ine.jpeg'),
(62,'1669251663478--ine.jpeg'),
(63,'1669251765495--ine.jpeg'),
(64,'1669251912519--ine.jpeg'),
(65,'1669252953029--ine.jpeg'),
(66,'1669253069950--ine1.jpeg'),
(67,'1669253082661--ine1.jpeg'),
(68,'1669253213535--ine1.jpeg'),
(69,'1669253242773--ine1.jpeg'),
(70,'1669254607361--ine1.jpeg'),
(71,'1669262437244--ine1.jpeg'),
(72,'1669262656530--ine1.jpeg'),
(73,'1669262912881--ine1.jpeg'),
(74,'1669263114480--ine1.jpeg'),
(75,'1669263189930--ine1.jpeg'),
(76,'1669263307683--ine1.jpeg'),
(77,'1669263443230--ine1.jpeg'),
(78,'1669309852886--ine1.jpeg'),
(79,'1669309868344--ine1.jpeg'),
(80,'1669309880804--ine.jpeg'),
(81,'1669309916663--ine.jpeg'),
(82,'1669310326371--ine.jpeg'),
(83,'1669310626128--ine1.jpeg'),
(84,'1669311135871--ine1.jpeg'),
(85,'1669311170959--ine.jpeg'),
(86,'1669312057640--ine1.jpeg'),
(87,'1669312160967--ine1.jpeg'),
(88,'1669312808333--ine1.jpeg'),
(89,'1669312833452--ine1.jpeg'),
(90,'1669312906862--ine1.jpeg'),
(91,'1669313035706--ine1.jpeg'),
(92,'1669314230244--ine1.jpeg'),
(93,'1670438628401--joseline.jpeg'),
(94,'1670439716979--luis.PNG'),
(95,'1670448046923--ine-GH.jpeg'),
(96,'1670448073069--ine-GH.jpeg'),
(97,'1670448201585--ine-GH.jpeg'),
(98,'1670612220439--ine1.jpeg'),
(99,'1670612232701--ine-GH.jpeg'),
(100,'1670612610337--ine1.jpeg'),
(101,'1670612681545--ine-GH.jpeg'),
(102,'1673466835155--ine-GH.jpeg'),
(103,'1673467067786--1667755533.webp'),
(104,'1673467147070--joseline.jpeg'),
(105,'1673467282960--1667755533.webp'),
(106,'1673467445910--luis.PNG'),
(107,'1673467461095--luis.jpeg'),
(108,'1673467478000--ine-GH.jpeg'),
(109,'1673468346452--ine1.jpeg'),
(110,'1673906580040--joseline.jpeg'),
(111,'1673907713437--ine-GH.jpeg'),
(112,'1673912646743--ine1.jpeg'),
(113,'1673913172568--ine-GH.jpeg'),
(114,'1673979920484--ine1.jpeg'),
(115,'1674151159168--joseline.jpeg'),
(116,'1674161971321--ine-GH.jpeg'),
(117,'1674191402236--ine1.jpeg'),
(118,'1674499356258--ine1.jpeg'),
(119,'1674502476442--ine1.jpeg'),
(120,'1674502678049--ine1.jpeg'),
(121,'1674504015308--ine-GH.jpeg'),
(122,'1674504864874--ine1.jpeg'),
(123,'1674509563823--ine1.jpeg'),
(124,'1674509815126--ine1.jpeg'),
(125,'1674510305850--ine-GH.jpeg'),
(126,'1674512795183--ine1.jpeg'),
(127,'1674536402651--ine-GH.jpeg'),
(128,'1674536500132--joseline.jpeg'),
(129,'1674536798473--ine1.jpeg'),
(130,'1674537835762--ine-GH.jpeg'),
(131,'1674540396815--ine1.jpeg'),
(132,'1674572085868--ine-GH.jpeg'),
(133,'1674572179324--luis.jpeg'),
(134,'1675189665062--ine1.jpeg'),
(135,'1675190797173--ine-GH.jpeg'),
(136,'1676522137349--ine1.jpeg'),
(137,'1677556972981--ine frente.jpeg'),
(138,'1677557111467--ine frente.jpeg'),
(139,'1677557707375--ine frente.jpeg'),
(140,'1677623423588--ine frente.jpeg'),
(141,'1677623464302--ine frente.jpeg'),
(142,'1677623489030--ine frente.jpeg'),
(143,'1677623508617--ine frente.jpeg'),
(144,'1677623822609--ine frente.jpeg'),
(145,'1677623859832--ine frente.jpeg'),
(146,'1677623943423--ine frente.jpeg'),
(147,'1677814005287--luis.PNG'),
(148,'1677814074223--luis.PNG'),
(149,'1677814473059--luis.PNG'),
(150,'1677814511452--luis.PNG'),
(151,'1677816526711--joseline.jpeg'),
(152,'1677816656239--joseline.jpeg'),
(153,'1677816803151--joseline.jpeg'),
(154,'1677816913551--joseline.jpeg'),
(155,'1677817360046--luis.PNG'),
(156,'1677817490219--luis.PNG'),
(157,'1681602737951--ine1.jpeg'),
(158,'1681602876509--ine-GH.jpeg'),
(159,'1681868812070--ine1.jpeg'),
(160,'1681868882022--ine1.jpeg'),
(161,'1681869844257--ine1.jpeg'),
(162,'1681874573788--ine1.jpeg'),
(163,'1681874683840--ine1.jpeg'),
(164,'1681874718785--luis.PNG'),
(165,'1683250755649--ine1.jpeg'),
(166,'1683416906940--ine1.jpeg'),
(167,'1683416940223--ine1.jpeg'),
(168,'1683417156432--ine1.jpeg'),
(169,'1683417547357--ine1.jpeg'),
(170,'1683596655288--joseline.jpeg'),
(171,'1683596767028--ine1.jpeg'),
(172,'1683598929485--luis.jpeg'),
(173,'1683598992603--luis.PNG'),
(174,'1683599057188--luis.jpeg'),
(175,'1683600645897--joseline.jpeg'),
(176,'1683601018727--ine1.jpeg'),
(177,'1683603090215--ine1.jpeg'),
(178,'1683945555824--ine1.jpeg'),
(179,'1683945584918--ine1.jpeg'),
(180,'1683945816769--ine1.jpeg'),
(181,'1683946267578--ine1.jpeg'),
(182,'1683946704924--ine1.jpeg'),
(183,'1683947289131--ine1.jpeg'),
(184,'1683947562984--joseline.jpeg'),
(185,'1683947672144--joseline.jpeg'),
(186,'1683948060523--ine1.jpeg'),
(187,'1683948207942--joseline.jpeg'),
(188,'1683948437038--joseline.jpeg'),
(189,'1683948490640--luis.jpeg'),
(190,'1683948500585--ine1.jpeg'),
(191,'1683948959571--ine1.jpeg'),
(192,'1683948974977--joseline.jpeg'),
(193,'1683949445557--luis.jpeg'),
(194,'1683949494524--ine1.jpeg'),
(195,'1683949516957--ine1.jpeg'),
(196,'1683949929016--ine1.jpeg'),
(197,'1683949990207--joseline.jpeg'),
(198,'1683950166678--joseline.jpeg'),
(199,'1683950328117--ine1.jpeg'),
(200,'1683950350028--ine1.jpeg'),
(201,'1683950462876--ine1.jpeg'),
(202,'1683951532081--ine1.jpeg'),
(203,'1683952437557--ine1.jpeg'),
(204,'1683952466936--ine1.jpeg'),
(205,'1683952592297--ine1.jpeg'),
(206,'1683952668516--ine1.jpeg'),
(207,'1683952713300--ine1.jpeg'),
(208,'1683952736730--ine1.jpeg'),
(209,'1683952763169--joseline.jpeg'),
(210,'1683952787505--ine1.jpeg'),
(211,'1683952839759--joseline.jpeg'),
(212,'1683952860835--ine1.jpeg'),
(213,'1683952876714--ine1.jpeg'),
(214,'1683952899789--joseline.jpeg'),
(215,'1683953013927--ine1.jpeg'),
(216,'1683953054150--ine1.jpeg'),
(217,'1683953121042--joseline.jpeg'),
(218,'1683953924923--joseline.jpeg'),
(219,'1683953957979--ine1.jpeg'),
(220,'1683954066014--joseline.jpeg'),
(221,'1683954110875--ine1.jpeg'),
(222,'1683954251882--joseline.jpeg'),
(223,'1684012119412--joseline.jpeg'),
(224,'1684012439077--joseline.jpeg'),
(225,'1684013489009--ine1.jpeg'),
(226,'1684014984295--ine1.jpeg'),
(227,'1684015108652--ine1.jpeg'),
(228,'1684015116600--ine1.jpeg'),
(229,'1684015379588--ine1.jpeg'),
(230,'1684015823790--ine1.jpeg'),
(231,'1684015849564--ine1.jpeg'),
(232,'1684015860615--ine1.jpeg'),
(233,'1684015876503--joseline.jpeg'),
(234,'1684016122841--ine1.jpeg'),
(235,'1684016161867--ine1.jpeg'),
(236,'1684016183080--ine1.jpeg'),
(237,'1684016244392--ine1.jpeg'),
(238,'1684016661261--ine1.jpeg'),
(239,'1684016684329--ine1.jpeg'),
(240,'1684016966488--joseline.jpeg'),
(241,'1684016967481--joseline.jpeg'),
(242,'1684016969925--joseline.jpeg'),
(243,'1684016973889--joseline.jpeg'),
(244,'1684016980874--joseline.jpeg'),
(245,'1684017115748--joseline.jpeg'),
(246,'1684017123172--joseline.jpeg'),
(247,'1684017296810--ine1.jpeg'),
(248,'1684017297771--ine1.jpeg'),
(249,'1684017299753--ine1.jpeg'),
(250,'1684017303444--ine1.jpeg'),
(251,'1684017337329--ine1.jpeg'),
(252,'1684017354845--ine1.jpeg'),
(253,'1684018548049--ine1.jpeg'),
(254,'1684018567378--ine1.jpeg'),
(255,'1684018727403--ine1.jpeg'),
(256,'1684019274283--ine1.jpeg'),
(257,'1684019319107--ine1.jpeg'),
(258,'1684019413616--ine1.jpeg'),
(259,'1684019449244--joseline.jpeg'),
(260,'1684019481785--ine1.jpeg'),
(261,'1684019482151--ine1.jpeg'),
(262,'1684019611808--ine1.jpeg'),
(263,'1684019612791--ine1.jpeg'),
(264,'1684019615034--ine1.jpeg'),
(265,'1684019618425--ine1.jpeg'),
(266,'1684019621476--ine1.jpeg'),
(267,'1684019630731--ine1.jpeg'),
(268,'1684019694699--ine1.jpeg'),
(269,'1684019700304--joseline.jpeg'),
(270,'1684019701012--joseline.jpeg'),
(271,'1684019701213--joseline.jpeg'),
(272,'1684019708516--joseline.jpeg'),
(273,'1684019709022--joseline.jpeg'),
(274,'1684019709758--joseline.jpeg'),
(275,'1684019712076--joseline.jpeg'),
(276,'1684019860800--joseline.jpeg'),
(277,'1684019861395--joseline.jpeg'),
(278,'1684019871538--joseline.jpeg'),
(279,'1684019878145--joseline.jpeg'),
(280,'1684019918659--ine1.jpeg'),
(281,'1684020206989--ine1.jpeg'),
(282,'1684020269866--ine1.jpeg'),
(283,'1684020305716--ine1.jpeg'),
(284,'1684020438984--ine1.jpeg'),
(285,'1684020523875--joseline.jpeg'),
(286,'1684020588431--ine1.jpeg'),
(287,'1684021423626--ine1.jpeg'),
(288,'1684022232766--joseline.jpeg'),
(289,'1684022390721--ine1.jpeg'),
(290,'1684022621656--ine1.jpeg'),
(291,'1684022775960--ine-GH.jpeg'),
(292,'1684023615329--ine1.jpeg'),
(293,'1684024428716--ine1.jpeg'),
(294,'1684024928948--ine1.jpeg'),
(295,'1684024966858--ine1.jpeg'),
(296,'1684025103054--ine1.jpeg'),
(297,'1684025422795--ine1.jpeg'),
(298,'1684025508914--ine1.jpeg'),
(299,'1684025554575--luis.jpeg'),
(300,'1684025600244--luis.jpeg'),
(301,'1684025610266--ine1.jpeg'),
(302,'1684025667925--ine1.jpeg'),
(303,'1684025679927--ine1.jpeg'),
(304,'1684026127134--ine1.jpeg'),
(305,'1684026157238--ine1.jpeg'),
(306,'1684026772816--luis.PNG'),
(307,'1684026867693--ine.jpeg'),
(308,'1684027305893--ine1.jpeg'),
(309,'1684027576877--ine1.jpeg'),
(310,'1684027997961--ine1.jpeg'),
(311,'1684028333211--ine1.jpeg'),
(312,'1684028402733--ine1.jpeg'),
(313,'1684029215810--ine1.jpeg'),
(314,'1684029380480--ine1.jpeg'),
(315,'1684029452537--ine1.jpeg'),
(316,'1684029734361--ine1.jpeg'),
(317,'1684029904580--ine1.jpeg'),
(318,'1684030054038--ine1.jpeg'),
(319,'1684030733297--ine1.jpeg'),
(320,'1684030833259--ine1.jpeg'),
(321,'1684031219859--ine1.jpeg'),
(322,'1684031805091--ine1.jpeg'),
(323,'1684032072306--ine1.jpeg'),
(324,'1684032471159--ine1.jpeg'),
(325,'1684032871085--ine1.jpeg'),
(326,'1684216057559--ine1.jpeg'),
(327,'1684217648554--ine1.jpeg'),
(328,'1684217681029--ine1.jpeg'),
(329,'1684295135978--ine1.jpeg'),
(330,'1684295642464--ine-GH.jpeg'),
(331,'1684296282304--ine1.jpeg'),
(332,'1684298892342--ine1.jpeg'),
(333,'1684380461775--ine1.jpeg'),
(334,'1684547438100--ine1.jpeg'),
(335,'1684548500281--luis.jpeg'),
(336,'1684557424314--ine1.jpeg'),
(337,'1684894059519--ine1.jpeg'),
(338,'1684894884164--ine.jpeg'),
(339,'1684896826826--ine.jpeg'),
(340,'1685235637488--ine1.jpeg'),
(341,'1685235659334--ine1.jpeg'),
(342,'1685235721893--ine1.jpeg'),
(343,'1685235845383--ine1.jpeg'),
(344,'1685417438196--ine1.jpeg'),
(345,'1685417984353--ine1.jpeg'),
(346,'1685418028313--ine1.jpeg'),
(347,'1685418223920--ine1.jpeg'),
(348,'1685418409644--ine1.jpeg'),
(349,'1685418698163--ine1.jpeg'),
(350,'1685418856375--ine1.jpeg'),
(351,'1685419052610--ine1.jpeg'),
(352,'1685419868632--ine1.jpeg'),
(353,'1685419957914--ine1.jpeg'),
(354,'1685420098451--ine1.jpeg'),
(355,'1685500312812--ine1.jpeg'),
(356,'1685500573001--ine-GH.jpeg'),
(357,'1685500709264--ine-GH.jpeg'),
(358,'1685500791303--ine-GH.jpeg'),
(359,'1685501005838--ine-GH.jpeg'),
(360,'1685501120053--ine1.jpeg'),
(361,'1685501236415--ine1.jpeg'),
(362,'1685501372497--ine-GH.jpeg'),
(363,'1685504056458--ine1.jpeg'),
(364,'1685504530351--ine1.jpeg'),
(365,'1685504542332--ine1.jpeg'),
(366,'1685504542722--ine1.jpeg'),
(367,'1685584482643--ine1.jpeg'),
(368,'1685584513692--ine-GH.jpeg'),
(369,'1685584873810--ine1.jpeg'),
(370,'1685585329890--ine1.jpeg'),
(371,'1685585518524--ine1.jpeg'),
(372,'1685585611738--ine1.jpeg'),
(373,'1685586383529--ine1.jpeg'),
(374,'1685586472161--ine1.jpeg'),
(375,'1685586546786--ine1.jpeg'),
(376,'1685587521446--ine1.jpeg'),
(377,'1685588295264--ine1.jpeg'),
(378,'1685588733501--ine1.jpeg'),
(379,'1685588860019--ine1.jpeg'),
(380,'1685589183088--ine1.jpeg'),
(381,'1685590043329--ine1.jpeg'),
(382,'1685590515240--ine1.jpeg'),
(383,'1685591141780--ine1.jpeg'),
(384,'1685644496629--ine1.jpeg'),
(385,'1685644648441--ine1.jpeg'),
(386,'1685644799591--ine1.jpeg'),
(387,'1685672454835--ine1.jpeg'),
(388,'1685674972990--ine1.jpeg'),
(389,'1685680383402--ine1.jpeg'),
(390,'1687916313381--ine1.jpeg'),
(391,'1687917638271--ine1.jpeg'),
(392,'1687917710154--ine-GH.jpeg'),
(393,'1687917870180--ine1.jpeg'),
(394,'1687918223757--ine1.jpeg'),
(395,'1687918236575--ine1.jpeg'),
(396,'1687918491441--ine1.jpeg'),
(397,'1687918549338--ine1.jpeg'),
(398,'1687918823553--ine1.jpeg'),
(399,'1687919195108--ine1.jpeg'),
(400,'1687919214217--ine1.jpeg'),
(401,'1687919346438--ine1.jpeg'),
(402,'1687919632384--ine1.jpeg'),
(403,'1687919645364--ine-GH.jpeg'),
(404,'1687919692864--ine1.jpeg'),
(405,'1687919938938--ine1.jpeg'),
(406,'1687920126675--ine1.jpeg'),
(407,'1687920291915--ine1.jpeg'),
(408,'1687920418292--ine1.jpeg'),
(409,'1687920474857--ine1.jpeg'),
(410,'1687920796317--ine1.jpeg'),
(411,'1687920992218--ine1.jpeg'),
(412,'1687921228965--ine1.jpeg'),
(413,'1687921336715--ine1.jpeg'),
(414,'1687921420915--ine1.jpeg'),
(415,'1687921480425--ine1.jpeg'),
(416,'1687921561049--ine1.jpeg'),
(417,'1687921622917--ine-GH.jpeg'),
(418,'1687921873737--ine1.jpeg'),
(419,'1687922682450--ine1.jpeg'),
(420,'1687922826180--ine1.jpeg'),
(421,'1687990112921--ine1.jpeg'),
(422,'1687991348051--ine1.jpeg'),
(423,'1687991479920--luis.PNG'),
(424,'1687991674565--ine1.jpeg'),
(425,'1687992857957--ine1.jpeg'),
(426,'1688001206506--mujer-embarazada-sentada-tocan'),
(427,'1688001265221--captura_de_pantalla_2016-04-12'),
(428,'1688001304808--ine-C.jpg'),
(429,'1688002001621--ine-C.jpg'),
(430,'1688002899811--ine-C.jpg'),
(431,'1688003152380--ine-C.jpg'),
(432,'1688003512346--ine-C.jpg'),
(433,'1688004373823--ine-C.jpg'),
(434,'1688004401891--ine-C.jpg'),
(435,'1688008929715--ine1.jpeg'),
(436,'1688009228470--ine1.jpeg'),
(437,'1688009273928--ine-GH.jpeg'),
(438,'1688009479488--joseline.jpeg'),
(439,'1688010559694--joseline.jpeg'),
(440,'1688010580941--joseline.jpeg'),
(441,'1688010643404--ine1.jpeg'),
(442,'1688011340281--ine1.jpeg'),
(443,'1688011373078--ine-GH.jpeg'),
(444,'1688088483125--ine-GH.jpeg'),
(445,'1688088705226--ine1.jpeg'),
(446,'1688088750551--ine.jpeg'),
(447,'1688088823563--ine-GH.jpeg'),
(448,'1688088863323--ine.jpeg'),
(449,'1688093458497--ine.jpeg'),
(450,'1688093646264--ine1.jpeg'),
(451,'1688095293768--ine1.jpeg'),
(452,'1688096366334--ine1.jpeg'),
(453,'1690472723643--ine1.jpeg'),
(454,'1691207001697--ine1.jpeg'),
(455,'1691207214593--ine1.jpeg'),
(456,'1691207297373--ine1.jpeg'),
(457,'1691207557955--ine1.jpeg'),
(458,'1691207752071--ine1.jpeg'),
(459,'1691207779291--ine1.jpeg'),
(460,'1691207779289--ine1.jpeg'),
(461,'1691376481851--ine1.jpeg'),
(462,'1691376693049--ine1.jpeg'),
(463,'1691376977793--ine1.jpeg'),
(464,'1691377090998--ine1.jpeg'),
(465,'1691377091449--ine1.jpeg'),
(466,'1691377700543--ine1.jpeg'),
(467,'1691377703280--ine1.jpeg'),
(468,'1691377958185--ine1.jpeg'),
(469,'1691378261069--ine1.jpeg'),
(470,'1691378615428--ine1.jpeg'),
(471,'1691378615993--ine1.jpeg'),
(472,'1691378617493--ine1.jpeg'),
(473,'1691378620611--ine1.jpeg'),
(474,'1691379185249--ine1.jpeg'),
(475,'1691460817277--ine1.jpeg'),
(476,'1691465801831--ine1.jpeg'),
(477,'1691466091380--ine1.jpeg'),
(478,'1691466216588--ine1.jpeg'),
(479,'1691466249602--ine1.jpeg'),
(480,'1691544164208--ine1.jpeg'),
(481,'1691544390043--ine1.jpeg'),
(482,'1691552715595--ine1.jpeg'),
(483,'1691553165530--ine1.jpeg'),
(484,'1691553422210--ine1.jpeg'),
(485,'1691553520471--ine1.jpeg'),
(486,'1691553698570--ine1.jpeg'),
(487,'1691553725766--ine1.jpeg'),
(488,'1691630895224--ine1.jpeg'),
(489,'1691631019289--ine1.jpeg'),
(490,'1691633228363--ine1.jpeg'),
(491,'1691633872467--ine1.jpeg'),
(492,'1691634227120--ine1.jpeg'),
(493,'1691634329600--ine1.jpeg'),
(494,'1691635276263--ine1.jpeg'),
(495,'1691635385878--ine-GH.jpeg'),
(496,'1691636863014--ine-GH.jpeg'),
(497,'1691636944578--ine1.jpeg'),
(498,'1691637682990--ine1.jpeg'),
(499,'1691637901778--ine1.jpeg'),
(500,'1691638038201--ine-C.jpg'),
(501,'1691638045276--ine-GH.jpeg'),
(502,'1691638148085--ine1.jpeg'),
(503,'1691638213423--ine1.jpeg'),
(504,'1691638384596--ine1.jpeg'),
(505,'1691638449250--ine1.jpeg'),
(506,'1691638556598--ine1.jpeg'),
(507,'1691638769187--ine1.jpeg'),
(508,'1691639008298--ine1.jpeg'),
(509,'1691639120248--ine1.jpeg'),
(510,'1691639885025--ine1.jpeg'),
(511,'1691639887999--ine1.jpeg'),
(512,'1691641862170--ine1.jpeg'),
(513,'1691641862413--ine1.jpeg'),
(514,'1691641998512--ine1.jpeg'),
(515,'1691642003137--ine1.jpeg'),
(516,'1691642003304--ine1.jpeg'),
(517,'1691642075034--ine1.jpeg'),
(518,'1691642213077--ine1.jpeg'),
(519,'1691642217627--ine1.jpeg'),
(520,'1691642283329--ine1.jpeg'),
(521,'1691642387672--ine1.jpeg');

/*Table structure for table `lider_ac` */

DROP TABLE IF EXISTS `lider_ac`;

CREATE TABLE `lider_ac` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) DEFAULT NULL,
  `cargo` varchar(500) DEFAULT NULL,
  `id_lider` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `lider_ac` */

insert  into `lider_ac`(`id`,`nombre`,`cargo`,`id_lider`) values 
(1,'FFF','JBHVBJNK',34);

/*Table structure for table `lider_colonia` */

DROP TABLE IF EXISTS `lider_colonia`;

CREATE TABLE `lider_colonia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `colonia` varchar(500) DEFAULT NULL,
  `id_lider` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `lider_colonia` */

/*Table structure for table `lider_otra` */

DROP TABLE IF EXISTS `lider_otra`;

CREATE TABLE `lider_otra` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) DEFAULT NULL,
  `cargo` varchar(500) DEFAULT NULL,
  `id_lider` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `lider_otra` */

/*Table structure for table `lider_partidista` */

DROP TABLE IF EXISTS `lider_partidista`;

CREATE TABLE `lider_partidista` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `partido_id` int(11) DEFAULT NULL,
  `id_lider` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `lider_partidista` */

insert  into `lider_partidista`(`id`,`partido_id`,`id_lider`) values 
(1,5,32);

/*Table structure for table `lider_tenencia` */

DROP TABLE IF EXISTS `lider_tenencia`;

CREATE TABLE `lider_tenencia` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tenencia` varchar(500) DEFAULT NULL,
  `id_lider` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `lider_tenencia` */

insert  into `lider_tenencia`(`id`,`tenencia`,`id_lider`) values 
(1,'6',31);

/*Table structure for table `lideres_t` */

DROP TABLE IF EXISTS `lideres_t`;

CREATE TABLE `lideres_t` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(500) DEFAULT NULL,
  `apaterno` varchar(500) DEFAULT NULL,
  `amaterno` varchar(500) DEFAULT NULL,
  `calle` varchar(500) DEFAULT NULL,
  `numero` varchar(100) DEFAULT NULL,
  `colonia` varchar(500) DEFAULT NULL,
  `cp` varchar(100) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `curp` varchar(500) DEFAULT NULL,
  `clave_electoral` varchar(500) DEFAULT NULL,
  `seccion` varchar(50) DEFAULT NULL,
  `id_Secc` int(11) DEFAULT NULL,
  `no_celular` varchar(150) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `twitter` varchar(500) DEFAULT NULL,
  `otra_red` varchar(500) DEFAULT NULL,
  `circulo` int(11) DEFAULT NULL,
  `contacto` varchar(500) DEFAULT NULL,
  `no_celcontacto` varchar(400) DEFAULT NULL,
  `observaciones` varchar(500) DEFAULT NULL,
  `lat` varchar(200) DEFAULT NULL,
  `lng` varchar(200) DEFAULT NULL,
  `img` varchar(500) DEFAULT NULL,
  `id_tipoLider` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=36 DEFAULT CHARSET=utf8mb4;

/*Data for the table `lideres_t` */

insert  into `lideres_t`(`id`,`nombres`,`apaterno`,`amaterno`,`calle`,`numero`,`colonia`,`cp`,`ciudad`,`fecha_nacimiento`,`curp`,`clave_electoral`,`seccion`,`id_Secc`,`no_celular`,`email`,`facebook`,`twitter`,`otra_red`,`circulo`,`contacto`,`no_celcontacto`,`observaciones`,`lat`,`lng`,`img`,`id_tipoLider`) values 
(34,'NORMA ALICIA','SIXTOS','AGUILAR','TARECUATO','572','SAN ISIDRO ITZICUARO ','58330','MORELIA','1975-12-18','SIAN751218MMNXGR02','SXAGNR75121816M800','1263',1,'4435896365','','','','',0,'','','','19.7036534','-101.2705688','447',6);

/*Table structure for table `partido_politico` */

DROP TABLE IF EXISTS `partido_politico`;

CREATE TABLE `partido_politico` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

/*Data for the table `partido_politico` */

insert  into `partido_politico`(`id`,`nombre`) values 
(1,'PAN'),
(2,'PRI'),
(3,'PRD'),
(4,'PT'),
(5,'PVEM'),
(6,'MC'),
(7,'MORENA'),
(8,'OTRO');

/*Table structure for table `prueba` */

DROP TABLE IF EXISTS `prueba`;

CREATE TABLE `prueba` (
  `id` int(11) NOT NULL,
  `nombre` varchar(45) DEFAULT NULL,
  `apellido` varchar(45) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

/*Data for the table `prueba` */

insert  into `prueba`(`id`,`nombre`,`apellido`) values 
(0,'Monserat','Castro');

/*Table structure for table `registro_estructura` */

DROP TABLE IF EXISTS `registro_estructura`;

CREATE TABLE `registro_estructura` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(500) DEFAULT NULL,
  `apaterno` varchar(500) DEFAULT NULL,
  `amaterno` varchar(500) DEFAULT NULL,
  `calle` varchar(500) DEFAULT NULL,
  `numero` varchar(100) DEFAULT NULL,
  `colonia` varchar(500) DEFAULT NULL,
  `cp` varchar(100) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `curp` varchar(500) DEFAULT NULL,
  `clave_electoral` varchar(500) DEFAULT NULL,
  `seccion` varchar(50) DEFAULT NULL,
  `id_Secc` int(11) DEFAULT NULL,
  `no_celular` varchar(150) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `twitter` varchar(500) DEFAULT NULL,
  `otra_red` varchar(500) DEFAULT NULL,
  `circulo` int(11) DEFAULT NULL,
  `observaciones` varchar(500) DEFAULT NULL,
  `lat` varchar(200) DEFAULT NULL,
  `lng` varchar(200) DEFAULT NULL,
  `img` varchar(500) DEFAULT NULL,
  `id_equipo` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4;

/*Data for the table `registro_estructura` */

insert  into `registro_estructura`(`id`,`nombres`,`apaterno`,`amaterno`,`calle`,`numero`,`colonia`,`cp`,`ciudad`,`fecha_nacimiento`,`curp`,`clave_electoral`,`seccion`,`id_Secc`,`no_celular`,`email`,`facebook`,`twitter`,`otra_red`,`circulo`,`observaciones`,`lat`,`lng`,`img`,`id_equipo`) values 
(1,'JOSELINE','RODRIGUEZ','BARRERA','JUCUTACATO ','600','SAN ISIDRO ITZICUARO ','58337','MORELIA','1997-10-06','ROBJ971006MDFDRS06','RDBRJS97100609M900','1263',1,'333','','','','',0,'ff','19.7030951','-101.2712664','440',2),
(2,'MONSERRAT ALEJANDRA','CASTRO','SIXTOS','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','1998-12-11','CASM981211MMNSXN09','CSSXMN98121116M100','1263',1,'4435896365','','','','',0,'222','19.7036534','-101.2705688','441',6),
(3,'MONSERRAT ALEJANDRA','CASTRO','SIXTOS','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','1998-12-11','CASM981211MMNSXN09','CSSXMN98121116M100','1263',0,'565564','','','','',0,'','19.703572594759603','-101.27053661349183','454',0),
(4,'MONSERRAT ALEJANDRA','CASTRO','SIXTOS','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','1998-12-11','CASM981211MMNSXN09','CSSXMN98121116M100','1263',0,'4435896365','','','','',2,'','19.70358269541688','-101.27052588465577','460',0),
(5,'MONSERRAT ALEJANDRA','CASTRO','SIXTOS','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','1998-12-11','CASM981211MMNSXN09','CSSXMN98121116M100','1263',1,'4435896365','','','','',0,'','19.7036534','-101.2705688','461',0);

/*Table structure for table `registro_promotores` */

DROP TABLE IF EXISTS `registro_promotores`;

CREATE TABLE `registro_promotores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(500) DEFAULT NULL,
  `apaterno` varchar(500) DEFAULT NULL,
  `amaterno` varchar(500) DEFAULT NULL,
  `calle` varchar(500) DEFAULT NULL,
  `numero` varchar(100) DEFAULT NULL,
  `colonia` varchar(500) DEFAULT NULL,
  `cp` varchar(100) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `curp` varchar(500) DEFAULT NULL,
  `clave_electoral` varchar(500) DEFAULT NULL,
  `seccion` varchar(50) DEFAULT NULL,
  `id_Secc` int(11) DEFAULT NULL,
  `no_celular` varchar(150) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `twitter` varchar(500) DEFAULT NULL,
  `otra_red` varchar(500) DEFAULT NULL,
  `circulo` int(11) DEFAULT NULL,
  `observaciones` varchar(500) DEFAULT NULL,
  `lat` varchar(200) DEFAULT NULL,
  `lng` varchar(200) DEFAULT NULL,
  `img` varchar(500) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4;

/*Data for the table `registro_promotores` */

insert  into `registro_promotores`(`id`,`nombres`,`apaterno`,`amaterno`,`calle`,`numero`,`colonia`,`cp`,`ciudad`,`fecha_nacimiento`,`curp`,`clave_electoral`,`seccion`,`id_Secc`,`no_celular`,`email`,`facebook`,`twitter`,`otra_red`,`circulo`,`observaciones`,`lat`,`lng`,`img`) values 
(2,'MONSERRAT ALEJANDRA','CASTRO','SIXTOS','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','1998-12-11','CASM981211MMNSXN09','CSSXMN98121116M100','1263',1,'4435896365','','','','',0,'','19.7036534','-101.2705688','413'),
(9,'MONSERRAT ALEJANDRA','CASTRO','SIXTOS','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','1998-12-11','CASM981211MMNSXN09','CSSXMN98121116M100','1263',1,'4435896365','','','','',0,'','19.7036534','-101.2705688','452');

/*Table structure for table `registro_promovidos` */

DROP TABLE IF EXISTS `registro_promovidos`;

CREATE TABLE `registro_promovidos` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(500) DEFAULT NULL,
  `apaterno` varchar(500) DEFAULT NULL,
  `amaterno` varchar(500) DEFAULT NULL,
  `calle` varchar(500) DEFAULT NULL,
  `numero` varchar(100) DEFAULT NULL,
  `colonia` varchar(500) DEFAULT NULL,
  `cp` varchar(100) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `curp` varchar(500) DEFAULT NULL,
  `clave_electoral` varchar(500) DEFAULT NULL,
  `seccion` varchar(50) DEFAULT NULL,
  `id_Secc` int(11) DEFAULT NULL,
  `no_celular` varchar(150) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `twitter` varchar(500) DEFAULT NULL,
  `otra_red` varchar(500) DEFAULT NULL,
  `circulo` int(11) DEFAULT NULL,
  `observaciones` varchar(500) DEFAULT NULL,
  `lat` varchar(200) DEFAULT NULL,
  `lng` varchar(200) DEFAULT NULL,
  `img` varchar(500) DEFAULT NULL,
  `id_promotor` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `registro_promovidos` */

insert  into `registro_promovidos`(`id`,`nombres`,`apaterno`,`amaterno`,`calle`,`numero`,`colonia`,`cp`,`ciudad`,`fecha_nacimiento`,`curp`,`clave_electoral`,`seccion`,`id_Secc`,`no_celular`,`email`,`facebook`,`twitter`,`otra_red`,`circulo`,`observaciones`,`lat`,`lng`,`img`,`id_promotor`) values 
(4,'MONSERRAT ALEJANDRA','CASTRO','SIXTOS','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','1998-12-11','CASM981211MMNSXN09','CSSXMN98121116M100','1263',NULL,'655656','','','','',0,'','19.7036534','-101.2705688','424',6),
(5,'MONSERRAT ALEJANDRA','CASTRO','SIXTOS','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','1998-12-11','CASM981211MMNSXN09','CSSXMN98121116M100','1263',1,'4435896365','','','','',0,'','19.7036534','-101.2705688','425',6),
(6,'MONSERRAT ALEJANDRA','CASTRO','SIXTOS','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','1998-12-11','CASM981211MMNSXN09','CSSXMN98121116M100','1263',1,'4445656','monse@gmail.com','fyugihjo','vugbhinjok','vbhnjmk',1,'rhrg','19.7036534','-101.2705688','478',2);

/*Table structure for table `registro_representantes_casilla` */

DROP TABLE IF EXISTS `registro_representantes_casilla`;

CREATE TABLE `registro_representantes_casilla` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(500) DEFAULT NULL,
  `apaterno` varchar(200) DEFAULT NULL,
  `amaterno` varchar(300) DEFAULT NULL,
  `calle` varchar(500) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `colonia` varchar(500) DEFAULT NULL,
  `cp` varchar(100) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `curp` varchar(200) DEFAULT NULL,
  `clave_electoral` varchar(200) DEFAULT NULL,
  `seccion` varchar(50) DEFAULT NULL,
  `id_Secc` int(11) DEFAULT NULL,
  `no_celular` varchar(150) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `twitter` varchar(500) DEFAULT NULL,
  `otra_red` varchar(500) DEFAULT NULL,
  `circulo` int(11) DEFAULT NULL,
  `contacto` varchar(200) DEFAULT NULL,
  `no_celcontacto` varchar(45) DEFAULT NULL,
  `observaciones` varchar(500) DEFAULT NULL,
  `lat` varchar(200) DEFAULT NULL,
  `lng` varchar(200) DEFAULT NULL,
  `img` varchar(500) DEFAULT NULL,
  `tipo_casilla` varchar(500) DEFAULT NULL,
  `id_casilla` varchar(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4;

/*Data for the table `registro_representantes_casilla` */

insert  into `registro_representantes_casilla`(`id`,`nombres`,`apaterno`,`amaterno`,`calle`,`numero`,`colonia`,`cp`,`ciudad`,`fecha_nacimiento`,`curp`,`clave_electoral`,`seccion`,`id_Secc`,`no_celular`,`email`,`facebook`,`twitter`,`otra_red`,`circulo`,`contacto`,`no_celcontacto`,`observaciones`,`lat`,`lng`,`img`,`tipo_casilla`,`id_casilla`) values 
(1,'MONSERRAT ALEJANDRA','CASTRO','SIXTOS','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','1998-12-11','CASM981211MMNSXN09','CSSXMN98121116M100','1263',1,'5432','','','','',0,'','','','19.7036534','-101.2705688','511','EC','9');

/*Table structure for table `registro_representantes_casilla_gral` */

DROP TABLE IF EXISTS `registro_representantes_casilla_gral`;

CREATE TABLE `registro_representantes_casilla_gral` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombres` varchar(500) DEFAULT NULL,
  `apaterno` varchar(200) DEFAULT NULL,
  `amaterno` varchar(300) DEFAULT NULL,
  `calle` varchar(500) DEFAULT NULL,
  `numero` varchar(20) DEFAULT NULL,
  `colonia` varchar(500) DEFAULT NULL,
  `cp` varchar(100) DEFAULT NULL,
  `ciudad` varchar(100) DEFAULT NULL,
  `fecha_nacimiento` date DEFAULT NULL,
  `curp` varchar(200) DEFAULT NULL,
  `clave_electoral` varchar(200) DEFAULT NULL,
  `seccion` varchar(50) DEFAULT NULL,
  `id_Secc` int(11) DEFAULT NULL,
  `no_celular` varchar(150) DEFAULT NULL,
  `email` varchar(500) DEFAULT NULL,
  `facebook` varchar(500) DEFAULT NULL,
  `twitter` varchar(500) DEFAULT NULL,
  `otra_red` varchar(500) DEFAULT NULL,
  `circulo` int(11) DEFAULT NULL,
  `contacto` varchar(200) DEFAULT NULL,
  `no_celcontacto` varchar(45) DEFAULT NULL,
  `observaciones` varchar(500) DEFAULT NULL,
  `lat` varchar(200) DEFAULT NULL,
  `lng` varchar(200) DEFAULT NULL,
  `img` varchar(500) DEFAULT NULL,
  `ruta` varchar(100) DEFAULT NULL,
  `consejo` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `registro_representantes_casilla_gral` */

insert  into `registro_representantes_casilla_gral`(`id`,`nombres`,`apaterno`,`amaterno`,`calle`,`numero`,`colonia`,`cp`,`ciudad`,`fecha_nacimiento`,`curp`,`clave_electoral`,`seccion`,`id_Secc`,`no_celular`,`email`,`facebook`,`twitter`,`otra_red`,`circulo`,`contacto`,`no_celcontacto`,`observaciones`,`lat`,`lng`,`img`,`ruta`,`consejo`) values 
(1,'MONSERRAT ALEJANDRA','CASTRO','SIXTOS','TARECUATO ','572','SAN ISIDRO ITZICUARO ','58337','MORELIA','1998-12-11','CASM981211MMNSXN09','CSSXMN98121116M100','1263',1,'556456','','','','',0,'','','','19.7036534','-101.2705688','521','3','1');

/*Table structure for table `secc_distrito` */

DROP TABLE IF EXISTS `secc_distrito`;

CREATE TABLE `secc_distrito` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `df` int(11) DEFAULT NULL,
  `dl` int(11) DEFAULT NULL,
  `secc` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=170 DEFAULT CHARSET=utf8mb4;

/*Data for the table `secc_distrito` */

insert  into `secc_distrito`(`id`,`df`,`dl`,`secc`) values 
(1,8,16,1263),
(2,10,12,1202),
(3,8,10,941),
(4,8,10,942),
(5,8,10,943),
(6,8,10,944),
(7,8,10,945),
(8,8,10,946),
(9,8,10,947),
(10,8,10,948),
(11,8,10,949),
(12,8,10,950),
(13,8,10,951),
(14,8,10,952),
(15,8,10,953),
(16,8,10,954),
(17,8,10,955),
(18,8,10,956),
(19,8,10,957),
(20,8,10,958),
(21,8,10,959),
(22,8,10,960),
(23,8,10,961),
(24,8,10,962),
(25,8,10,963),
(26,8,10,964),
(27,8,10,965),
(28,8,10,966),
(29,8,10,967),
(30,8,10,996),
(31,8,10,997),
(32,8,10,998),
(33,8,10,999),
(34,8,10,1000),
(35,8,10,1001),
(36,8,10,1002),
(37,8,10,1003),
(38,8,10,1004),
(39,8,10,1005),
(40,8,10,1006),
(41,8,10,1007),
(42,8,10,1008),
(43,8,10,1009),
(44,8,10,1010),
(45,8,10,1011),
(46,8,10,1012),
(47,8,10,1013),
(48,8,10,1014),
(49,8,10,1015),
(50,8,10,1016),
(51,8,10,1017),
(52,8,10,1018),
(53,8,10,1019),
(54,8,10,1020),
(55,8,10,1021),
(56,8,10,1022),
(57,8,10,1023),
(58,8,16,1047),
(59,8,16,1048),
(60,8,16,1049),
(61,8,16,1050),
(62,8,16,1051),
(63,8,16,1052),
(64,8,16,1053),
(65,8,16,1054),
(66,8,16,1055),
(67,8,16,1056),
(68,8,16,1057),
(69,8,16,1058),
(70,8,16,1059),
(71,8,16,1060),
(72,8,16,1061),
(73,8,16,1062),
(74,8,16,1063),
(75,8,16,1064),
(76,8,16,1065),
(77,8,16,1066),
(78,8,16,1131),
(79,8,16,1132),
(80,8,16,1133),
(81,8,16,1134),
(82,8,16,1135),
(83,8,16,1136),
(84,8,16,1137),
(85,8,16,1138),
(86,8,16,1139),
(87,8,16,1141),
(88,8,16,1142),
(89,8,16,1143),
(90,8,16,1144),
(91,8,16,1145),
(92,8,16,1146),
(93,8,16,1147),
(94,8,16,1148),
(95,8,16,1149),
(96,8,16,1150),
(97,8,16,1151),
(98,8,16,1152),
(99,8,16,1153),
(100,8,16,1160),
(101,8,16,1161),
(102,8,10,1191),
(103,8,10,1193),
(104,8,10,1197),
(105,8,10,1198),
(106,8,10,1199),
(107,8,10,1200),
(108,8,10,1201),
(109,8,10,1203),
(110,8,10,1204),
(111,8,10,1208),
(112,8,10,1209),
(113,8,10,1210),
(114,8,10,1211),
(115,8,10,1212),
(116,8,10,1213),
(117,8,10,1214),
(118,8,16,1215),
(119,8,16,1216),
(120,8,10,1217),
(121,8,10,1218),
(122,8,10,1219),
(123,8,10,1220),
(124,8,16,1221),
(125,8,16,1222),
(126,8,16,1239),
(127,8,16,1240),
(128,8,16,1247),
(129,8,16,1278),
(130,8,16,1249),
(131,8,10,1252),
(132,8,10,1253),
(133,8,10,1254),
(134,8,10,1255),
(135,8,10,1256),
(136,8,10,1257),
(137,8,10,1258),
(138,8,10,1259),
(139,8,10,1260),
(140,8,10,1261),
(141,8,16,1264),
(142,8,16,1266),
(143,8,10,1283),
(144,8,10,2677),
(145,8,16,2704),
(146,8,16,2705),
(147,8,16,2706),
(148,8,16,2707),
(149,8,16,2708),
(150,8,16,2709),
(151,8,16,2710),
(152,8,16,2711),
(153,8,16,2712),
(154,8,16,2713),
(155,8,16,2714),
(156,8,16,2715),
(157,8,16,2716),
(158,8,10,2717),
(159,8,10,2718),
(160,8,10,2719),
(161,8,10,2720),
(162,8,10,2721),
(163,8,10,2722),
(164,8,10,2723),
(165,8,10,2724),
(166,8,10,2729),
(167,8,10,2730),
(168,8,10,2747),
(169,8,10,2748);

/*Table structure for table `secciones_injerencia_estructura` */

DROP TABLE IF EXISTS `secciones_injerencia_estructura`;

CREATE TABLE `secciones_injerencia_estructura` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `estructura_id` int(11) DEFAULT NULL,
  `seccion_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4;

/*Data for the table `secciones_injerencia_estructura` */

insert  into `secciones_injerencia_estructura`(`id`,`estructura_id`,`seccion_id`) values 
(1,6,1),
(2,6,2),
(3,6,2),
(4,6,1),
(5,6,1),
(6,6,2),
(7,6,1),
(8,6,2),
(9,6,1),
(10,6,2),
(11,2,1),
(12,2,2),
(13,3,1),
(14,4,1),
(15,5,1),
(16,6,1),
(17,7,1),
(18,8,1),
(19,9,1),
(20,9,2),
(21,1,3),
(22,1,2),
(23,1,1),
(24,2,1);

/*Table structure for table `secciones_injerencia_lider` */

DROP TABLE IF EXISTS `secciones_injerencia_lider`;

CREATE TABLE `secciones_injerencia_lider` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `lider_id` int(11) DEFAULT NULL,
  `seccion_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

/*Data for the table `secciones_injerencia_lider` */

insert  into `secciones_injerencia_lider`(`id`,`lider_id`,`seccion_id`) values 
(1,24,1),
(2,24,2),
(3,25,1),
(4,25,2),
(5,26,1),
(6,32,1);

/*Table structure for table `secciones_responsabilidad_promotores` */

DROP TABLE IF EXISTS `secciones_responsabilidad_promotores`;

CREATE TABLE `secciones_responsabilidad_promotores` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `promotor_id` int(11) DEFAULT NULL,
  `seccion_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=30 DEFAULT CHARSET=utf8mb4;

/*Data for the table `secciones_responsabilidad_promotores` */

insert  into `secciones_responsabilidad_promotores`(`id`,`promotor_id`,`seccion_id`) values 
(1,NULL,1),
(2,NULL,2),
(3,3,3),
(4,3,2),
(5,4,1),
(6,4,2),
(7,5,1),
(8,5,2),
(9,1,1),
(10,4,1),
(11,4,2),
(12,5,1),
(13,5,2),
(14,5,3),
(15,5,6),
(16,6,1),
(17,6,3),
(18,6,4),
(19,7,1),
(20,7,2),
(21,7,3),
(22,7,4),
(23,8,4),
(24,8,5),
(25,8,6),
(27,9,2),
(28,9,3);

/*Table structure for table `secciones_responsabilidad_representantes` */

DROP TABLE IF EXISTS `secciones_responsabilidad_representantes`;

CREATE TABLE `secciones_responsabilidad_representantes` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `representante_id` int(11) DEFAULT NULL,
  `seccion_id` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4;

/*Data for the table `secciones_responsabilidad_representantes` */

insert  into `secciones_responsabilidad_representantes`(`id`,`representante_id`,`seccion_id`) values 
(1,1,1);

/*Table structure for table `tipo_casilla` */

DROP TABLE IF EXISTS `tipo_casilla`;

CREATE TABLE `tipo_casilla` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tipo_casilla` */

insert  into `tipo_casilla`(`id`,`nombre`) values 
(1,'Básica'),
(2,'Contigua'),
(3,'Extraordinaria'),
(4,'Especial');

/*Table structure for table `tipo_lider` */

DROP TABLE IF EXISTS `tipo_lider`;

CREATE TABLE `tipo_lider` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `nombre_tipo` varchar(500) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tipo_lider` */

insert  into `tipo_lider`(`id`,`nombre_tipo`) values 
(1,'Sacerdote'),
(2,'Lider partidista'),
(3,'Maestro'),
(4,'Jefe de tenencia'),
(5,'Encargado del orden'),
(6,'Asociacion civil'),
(7,'Otro');

/*Table structure for table `tipo_representate` */

DROP TABLE IF EXISTS `tipo_representate`;

CREATE TABLE `tipo_representate` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nombre` varchar(200) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

/*Data for the table `tipo_representate` */

insert  into `tipo_representate`(`id`,`nombre`) values 
(1,'General'),
(2,'De casilla');

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
