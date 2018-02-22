DROP DATABASE IF EXISTS HIRING;
CREATE DATABASE HIRING CHARACTER SET utf8 DEFAULT CHARACTER SET utf8 COLLATE utf8_unicode_ci DEFAULT COLLATE utf8_unicode_ci;
DROP USER 'hiring'@'localhost';
DROP USER 'hiring'@'%';
CREATE USER 'hiring'@'localhost' IDENTIFIED BY '@t1r310P@uN0G@t0';
CREATE USER 'hiring'@'%' IDENTIFIED BY '@t1r310P@uN0G@t0';
GRANT ALL ON HIRING.* TO 'hiring'@'localhost' WITH GRANT OPTION;

USE HIRING;

CREATE TABLE Manufacturer (
	manufacturer_id INT UNSIGNED AUTO_INCREMENT,
	manufacturer VARCHAR (32) NOT NULL,
	PRIMARY KEY (manufacturer_id),
	UNIQUE (manufacturer)
) ENGINE = InnoDB;

CREATE TABLE Model (
	model_id INT UNSIGNED AUTO_INCREMENT,
	manufacturer_id INT UNSIGNED,
	model VARCHAR (64) NOT NULL,
	PRIMARY KEY (model_id),
	INDEX (manufacturer_id),
	FOREIGN KEY (manufacturer_id) REFERENCES Manufacturer (manufacturer_id) ON DELETE CASCADE ON UPDATE CASCADE,
	UNIQUE (model)
) ENGINE = InnoDB;

CREATE TABLE CarrierPlanType (
	carrier_plan_type_id INT UNSIGNED AUTO_INCREMENT,
	carrier_plan_type VARCHAR (32) NOT NULL,
	PRIMARY KEY (carrier_plan_type_id),
	UNIQUE (carrier_plan_type)
) ENGINE = InnoDB;

CREATE TABLE Color (
	color_id INT UNSIGNED AUTO_INCREMENT,
	color VARCHAR (32) NOT NULL,
	PRIMARY KEY (color_id),
	UNIQUE (color)
) ENGINE = InnoDB;

CREATE TABLE InventoryItem (
	inventory_item_id INT UNSIGNED AUTO_INCREMENT,
	model_id INT UNSIGNED,
	carrier_plan_type_id INT UNSIGNED,
	color_id INT UNSIGNED,
	quantity INT UNSIGNED,
	price FLOAT,
	PRIMARY KEY (inventory_item_id),
	INDEX (model_id),
	INDEX (carrier_plan_type_id),
	INDEX (color_id),
	FOREIGN KEY (model_id) REFERENCES Model (model_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (carrier_plan_type_id) REFERENCES CarrierPlanType (carrier_plan_type_id) ON DELETE CASCADE ON UPDATE CASCADE,
	FOREIGN KEY (color_id) REFERENCES Color (color_id) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB;

INSERT INTO Manufacturer (manufacturer) VALUES ('Apple');
INSERT INTO Manufacturer (manufacturer) VALUES ('Motorola');
INSERT INTO Manufacturer (manufacturer) VALUES ('Samsung');

INSERT INTO Model (model, manufacturer_id) VALUES ('iPhone SE 16GB', 1);
INSERT INTO Model (model, manufacturer_id) VALUES ('Moto G5 16GB', 2);
INSERT INTO Model (model, manufacturer_id) VALUES ('Galaxy S8 64GB', 3);


INSERT INTO Color (color) VALUES ('Arctic Gray');
INSERT INTO Color (color) VALUES ('Midnight Black');
INSERT INTO Color (color) VALUES ('Preto');
INSERT INTO Color (color) VALUES ('Rose');
INSERT INTO Color (color) VALUES ('Space Gray');
INSERT INTO Color (color) VALUES ('Vermelho');

INSERT INTO CarrierPlanType (carrier_plan_type) VALUES ('pos');
INSERT INTO CarrierPlanType (carrier_plan_type) VALUES ('pre');
