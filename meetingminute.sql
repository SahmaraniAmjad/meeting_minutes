CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(128) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `username_UNIQUE` (`email`)
);

CREATE TABLE `Socket` (
  `id` varchar(45) NOT NULL,
  `user_id` int(11) NOT NULL,
  KEY `fk_Socket_user_id_idx` (`user_id`),
  CONSTRAINT `fk_Socket_user_id` FOREIGN KEY (`user_id`) REFERENCES `user` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
);

CREATE TABLE `created_meetings` (
`id` int(11) NOT NULL AUTO_INCREMENT,
`team_lead` varchar(45)  NOT NULL,
`creation_date` varchar(45)  NOT NULL,
`start_time` char(45) NOT NULL,
`end_time` char(45) NOT NULL,
`status` varchar(1000) NOT NULL,
`agenda` varchar(1000) NOT NULL,
`next_things` varchar(1000) NOT NULL,
PRIMARY KEY (`id`)
) ENGINE=INNODB;




