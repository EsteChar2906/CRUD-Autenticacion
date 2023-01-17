-- creando base de datos
CREATE DATABASE crud_negocios;

--- utilizando la db 
USE crud_negocios;

-- creando tabla
CREATE TABLE usuarios(
	ID INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	Identificacion INT(12), 
	Primer_nombre VARCHAR(50) NOT NULL,
	Segundo_nombre VARCHAR(50),
	Primer_apellido VARCHAR(50) NOT NULL,
	Segundo_apellido VARCHAR(50) NOT NULL,
	Celular VARCHAR(15),
	Correo VARCHAR(50) NOT NULL,
	Contraseña VARCHAR(60) NOT NULL
);

CREATE TABLE Negocios(
ID INT(6) AUTO_INCREMENT PRIMARY KEY,
Nombre VARCHAR(50) NOT NULL,
Direccion VARCHAR(100) NOT NULL,
Celular VARCHAR(15),
Correo VARCHAR(50) NOT NULL,
User_id INT(6) UNSIGNED NOT NULL,
CONSTRAINT `fk_user` FOREIGN KEY (User_id) REFERENCES usuarios (ID)
);

-- mostrar tablas
SHOW TABLES;

-- describir tabla
DESCRIBE negocios;