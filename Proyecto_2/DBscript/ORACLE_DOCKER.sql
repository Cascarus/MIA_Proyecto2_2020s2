-- ------------------------------------------------------------------
-- CREACION DE TABLAS
-- ------------------------------------------------------------------
-- -----------------------------------------------------
-- Tabla Pais
-- -----------------------------------------------------
CREATE TABLE Pais(
    Cod_pais NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL ,
    Pais VARCHAR2(50) NULL,
    CONSTRAINT PK_PAIS_Cod_pais PRIMARY KEY(Cod_Pais)
);

-- -----------------------------------------------------
-- Tabla Categorias
-- -----------------------------------------------------
CREATE TABLE Categorias(
    Cod_categoria NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL,
    Categoria VARCHAR2(50) NULL,
    CONSTRAINT PK_CATEGORIA_Cod_Categoria PRIMARY KEY(Cod_categoria)
);

-- -----------------------------------------------------
-- Tabla Usuarios
-- -----------------------------------------------------
CREATE TABLE Usuarios (
    Cod_usuario NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL,
    Nombre VARCHAR2(60) NULL,
    Apellido VARCHAR2(60) NULL,
    Correo VARCHAR2(60) NULL,
    Cod_Pais NUMBER NOT NULL,
    Fecha DATE NULL,
    Tipo NUMBER(1)NULL,
    Contrasena VARCHAR2(100) NULL,
    Foto VARCHAR2(200) NULL,
    Creditos NUMBER NULL,
    Validacion NUMBER(1) NULL,
    CONSTRAINT PK_USUARIO_Cod_usuario PRIMARY KEY(Cod_usuario),
    CONSTRAINT FK_Usuarios_Pais FOREIGN KEY (Cod_Pais)
        REFERENCES Pais (Cod_pais)
        ON DELETE CASCADE 
);

-- -----------------------------------------------------
-- Tabla Productos
-- -----------------------------------------------------
CREATE TABLE Productos (
    Cod_producto NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL,
    Cod_usuario NUMBER NOT NULL,
    Producto VARCHAR2(50) NULL,
    Precio NUMBER NULL,
    Descripcion VARCHAR2(160) NULL,
    Foto VARCHAR2(200) NULL,
    Likes NUMBER NULL,
    Dislikes NUMBER NULL,
    Bloqueado NUMBER(1) NULL,
    CONSTRAINT PK_PRODUCTO_Cod_Producto PRIMARY KEY(Cod_producto),
    CONSTRAINT fk_Productos_Usuarios FOREIGN KEY (Cod_usuario)
        REFERENCES Usuarios (Cod_usuario)
        ON DELETE CASCADE  
);

-- -----------------------------------------------------
-- Tabla Bitacora
-- -----------------------------------------------------
CREATE TABLE Bitacora(
    Cod_bitacora NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL,
    Cod_usuario NUMBER NOT NULL,
    Descripcion VARCHAR2(160) NULL,
    Fecha DATE NULL,
    CONSTRAINT PK_BITACORA_COD_BITACORA PRIMARY KEY(Cod_bitacora),
    CONSTRAINT FK_Bitacora_Usuario FOREIGN KEY (Cod_usuario)
        REFERENCES Usuarios (Cod_usuario)
        ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Tabla Comentarios
-- -----------------------------------------------------
CREATE TABLE Comentarios (
    Cod_comentario NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL,
    Cod_usuario NUMBER NOT NULL,
    Cod_producto NUMBER NOT NULL,
    Comentario VARCHAR2(160) NULL,
    CONSTRAINT PK_COMENTARIO_COD_COMENTARIO PRIMARY KEY(Cod_comentario),
    CONSTRAINT FK_Comentarios_Usuario FOREIGN KEY (Cod_usuario)
        REFERENCES Usuarios (Cod_usuario)
        ON DELETE CASCADE
        ,
    CONSTRAINT FK_Comentarios_Producto FOREIGN KEY (Cod_producto)
        REFERENCES Productos (Cod_producto)
        ON DELETE CASCADE  
);

-- -----------------------------------------------------
-- Tabla Denuncias
-- -----------------------------------------------------
CREATE TABLE Denuncias (
    Cod_denuncia NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL,
    Cod_usuario NUMBER NOT NULL,
    Cod_producto NUMBER NOT NULL,
    Descripcion VARCHAR2(160) NULL,
    CONSTRAINT PK_DENUNCIA_COD_DENUNCIA PRIMARY KEY(Cod_denuncia),
    CONSTRAINT FK_Denuncias_Usuario FOREIGN KEY(Cod_usuario)
        REFERENCES Usuarios (Cod_usuario)
        ON DELETE CASCADE
        ,
    CONSTRAINT FK_Denuncias_Producto FOREIGN KEY(Cod_producto)
        REFERENCES Productos (Cod_producto)
        ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Tabla Detalle_categoria
-- -----------------------------------------------------
CREATE TABLE Detalle_categoria (
    Cod_det_categoria NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL,
    Cod_producto NUMBER NOT NULL,
    Cod_categoria NUMBER NOT NULL,
    CONSTRAINT PK_DETALLE_CATEGORIA PRIMARY KEY(Cod_det_categoria),
    CONSTRAINT FK_Det_categoria_producto FOREIGN KEY(Cod_producto)
        REFERENCES Productos (Cod_producto)
        ON DELETE CASCADE
        ,
    CONSTRAINT FK_Det_categoria_categoria FOREIGN KEY(Cod_categoria)
        REFERENCES Categorias (Cod_categoria)
        ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Tabla Compras
-- -----------------------------------------------------
CREATE TABLE Compras (
    Cod_compra NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL,
    Cod_usuario NUMBER NOT NULL,
    Fecha DATE NULL,
    CONSTRAINT PK_COMPRAS_Cod_compra PRIMARY KEY(Cod_compra),
    CONSTRAINT FK_Compras_Usuario FOREIGN KEY(Cod_usuario)
        REFERENCES Usuarios (Cod_usuario)
        ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Tabla Carrito
-- -----------------------------------------------------
CREATE TABLE Carrito (
    Cod_carrito NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL,
    Cod_usuario NUMBER NOT NULL,
    Fecha DATE NULL,
    Bloqueado NUMBER(1) NULL,
    CONSTRAINT PK_Carrito_Cod_carrito PRIMARY KEY(Cod_carrito),
    CONSTRAINT FK_Carrito_Usuario FOREIGN KEY(Cod_usuario)
        REFERENCES Usuarios (Cod_usuario)
        ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Tabla Detalle_compras
-- -----------------------------------------------------
CREATE TABLE Detalle_compras (
  Cod_det_compra NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL,
  Cod_compra NUMBER NOT NULL,
  Cod_producto NUMBER NOT NULL,
  Cantidad NUMBER NULL,
  Precio NUMBER NULL,
  Sub_Total NUMBER NULL,
  CONSTRAINT PK_Det_Compras_Cod_Det_Compras PRIMARY KEY(Cod_det_compra),
  CONSTRAINT FK_Det_compras_compras FOREIGN KEY(Cod_compra)
    REFERENCES Compras (Cod_compra)
    ON DELETE CASCADE,
  CONSTRAINT FK_Det_compras_productos FOREIGN KEY(Cod_producto)
    REFERENCES Productos (Cod_producto)
    ON DELETE CASCADE
);

-- -----------------------------------------------------
-- Tablea Detalle_Carrito
-- -----------------------------------------------------
CREATE TABLE Detalle_Carrito (
  Cod_det_carrito NUMBER GENERATED ALWAYS as IDENTITY(START with 1 INCREMENT by 1) NOT NULL,
  Cod_Carrito NUMBER NOT NULL,
  Cod_producto NUMBER NOT NULL,
  Cantidad NUMBER NULL,
  Precio NUMBER NULL,
  Sub_Total NUMBER NULL,
  CONSTRAINT PK_Det_Carrito_Cod_Det_Carrito PRIMARY KEY(Cod_det_carrito),
  CONSTRAINT FK_Det_carrito_compras FOREIGN KEY(Cod_Carrito)
    REFERENCES Carrito (Cod_carrito)
    ON DELETE CASCADE,
  CONSTRAINT FK_Det_carrito_productos FOREIGN KEY(Cod_producto)
    REFERENCES Productos (Cod_producto)
    ON DELETE CASCADE
);

-- -----


-- -------------------------------------------------------------------
-- INSERCION DE DATOS
-- -------------------------------------------------------------------
INSERT INTO pais(pais)VALUES(' ');
INSERT INTO pais(pais)VALUES('Guatemala');
INSERT INTO pais(pais)VALUES('Nicaragua');
INSERT INTO pais(pais)VALUES('Mexico');
INSERT INTO pais(pais)VALUES('Belice');
INSERT INTO pais(pais)VALUES('Honduras');
INSERT INTO pais(pais)VALUES('Brasil');
INSERT INTO pais(pais)VALUES('España');
INSERT INTO pais(pais)VALUES('Francia');
INSERT INTO pais(pais)VALUES('Italia');
INSERT INTO pais(pais)VALUES('Canada');
INSERT INTO pais(pais)VALUES('China');
INSERT INTO pais(pais)VALUES('India');
INSERT INTO pais(pais)VALUES('Ecuador');
INSERT INTO pais(pais)VALUES('Estados Unidos');
INSERT INTO pais(pais)VALUES('Panama');
INSERT INTO pais(pais)VALUES('Peru');
INSERT INTO pais(pais)VALUES('Sur africa');
INSERT INTO pais(pais)VALUES('Argentina');

INSERT INTO categorias(categoria)VALUES('Videojuegos');
INSERT INTO categorias(categoria)VALUES('Electrodomésticos');
INSERT INTO categorias(categoria)VALUES('Accesorios');
INSERT INTO categorias(categoria)VALUES('Electrónica ');
INSERT INTO categorias(categoria)VALUES('Informática');
INSERT INTO categorias(categoria)VALUES('Herramientas');
INSERT INTO categorias(categoria)VALUES('Promociones');
INSERT INTO categorias(categoria)VALUES('Descuentos ');
INSERT INTO categorias(categoria)VALUES('Audiovisual');
INSERT INTO categorias(categoria)VALUES('Comestibles');
INSERT INTO categorias(categoria)VALUES('Viajes');
INSERT INTO categorias(categoria)VALUES('Productos del hogar');
INSERT INTO categorias(categoria)VALUES('Muebles');

INSERT INTO usuarios(Nombre, Correo, Cod_Pais, Fecha, Tipo, Contrasena)
VALUES('admin','admin',1,TO_DATE('2020/10/17','YYYY/MM/DD'), 0, 'admin');
INSERT INTO usuarios(Nombre, Apellido, Correo, Cod_pais, Fecha, Tipo, Contrasena, Foto, Creditos, Validacion)
VALUES('Diego','Caballeros','Diego_M96@hotmail.com',4,TO_DATE('2020/10/1','YYYY/MM/DD'),1,'202cb962ac59075b964b07152d234b70','https://lh3.googleusercontent.com/proxy/9L1AfvkQZPFpHsS0_fh1rvoq0Tm6Kqs6VU1gmx5riDkQQzRGJpsyHRsFzJn0VpJnqCNJCRIZ9dBE4KyK7-Da05WSm6_4lxdfBip8eNhzLGnMnknCoMfqrQeuBFqSbJYf88kWgQ',10000,1);
INSERT INTO usuarios(Nombre, Apellido, Correo, Cod_pais, Fecha, Tipo, Contrasena, Foto, Creditos, Validacion)
VALUES('Karol','Hernandez','Karol17323@gmail.com',19,TO_DATE('2020/05/2','YYYY/MM/DD'),1,'202cb962ac59075b964b07152d234b70','https://www.dzoom.org.es/wp-content/uploads/2020/02/portada-foto-perfil-redes-sociales-consejos-810x540.jpg',10000,1);
INSERT INTO usuarios(Nombre, Apellido, Correo, Cod_pais, Fecha, Tipo, Contrasena, Foto, Creditos, Validacion)
VALUES('Maria','Paula','Mapa@gmail.com',11,TO_DATE('1997/12/9','YYYY/MM/DD'),1,'202cb962ac59075b964b07152d234b70','https://media.cdnandroid.com/item_images/1068635/imagen-girly-wallpapers-profil-pics-for-girls-0thumb.jpeg',10000,1);
INSERT INTO usuarios(Nombre, Apellido, Correo, Cod_pais, Fecha, Tipo, Contrasena, Foto, Creditos, Validacion)
VALUES('Pau','Gasol','pauG@outlook.com',4,TO_DATE('1997/01/9','YYYY/MM/DD'),1,'202cb962ac59075b964b07152d234b70','https://image.freepik.com/vector-gratis/perfil-empresario-dibujos-animados_18591-58479.jpg',10000,1);
INSERT INTO usuarios(Nombre, Apellido, Correo, Cod_pais, Fecha, Tipo, Contrasena, Foto, Creditos, Validacion)
VALUES('Ana','Franks','Ana_L218@preba.com',9,TO_DATE('1997/09/12','YYYY/MM/DD'),1,'12345','https://pm1.narvii.com/7004/fe9b304538b473ecd12d1b0297c722155d854dd5r1-236-314v2_uhq.jpg',10000,1);
INSERT INTO usuarios(Nombre, Apellido, Correo, Cod_Pais, Fecha, Tipo, Contrasena, Foto, Creditos, Validacion)
VALUES('Juan Carlos','Bodoque','Juan.Bodoque@31minutos.com',12,TO_DATE('2000/12/12','YYYY/MM/DD'),1,'12345','https://i.pinimg.com/736x/30/2a/e0/302ae09eac70e633cb2784b25a841520.jpg',10000,1);

INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(2,'Lavadora G35',550,'Lavadora marca Wirpool',5,2,0,'uploads/1029724_15_1.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(2,'Celular Huawei Mate 20',1500,'Smartphone marca Huawei de la linea Mate',8,1,0,'uploads/1539695294_921163_1539707990_sumario_normal.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(3,'Licuadora OSTER',389.90,'1.5 Litros 8 Velocidades Varios Colores',1,0,0,'uploads/945546_1.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(4,'Plancha de vapor',299,'PLANCHA D/VAPOR marca Black and Decker ANTIADHERENTE GRIS - ByD',6,2,0,'uploads/1000524.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(4,'Televisor led Smart',1339.10,'TELEVISOR SMART HAIER DE 32 PLG - HAIER',1,0,0,'uploads/1020430_a.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(5,'Taladro',400,'TALADRO 3/8 12V - PRETUL',2,0,0,'uploads/1012300.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(5,'Secadora de ropa',7000,'SECADORA DE ROPA DE 20KG BLANCO - SAMSUNG',0,3,0,'uploads/1027160_15.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(6,'Set de sartenes',350,'SET 3 SARTENES NEGRO 18/20/24 CM ANTIADHERENTE - CINSA',10,1,0,'uploads/943849_1.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(6,'Maleta Viaje 360 Cassiopea',869,'Disfruta De Tus Viajes Con La Seguridad Y Comodidad Que Te Ofrece Está Colección. ',5,1,0,'uploads/ma17adm001-1920s-9m5_22108.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(7,'TECLADO CORSAIR K68',795,'El CORSAIR K68 incluye interruptores mecánicos 100 CHERRY MX Red con retroiluminación dinámica y resistencia al polvo y los derrames',0,3,0,'uploads/71lUBIKaY8L.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(8,'Saco Yffushi Blazer',389.50,'Hecho de tela de poliéster de alta calidad. Antiarrugas y fácil de mantener la forma del traje, sino que también es transpirable, suave y fácil de lavar',10,1,0,'uploads/61vZTopfj-L._AC_UX342_.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(21,'Sercha Avant',25,'Set de 10 serchas de platico',0,0,0,'uploads/cercha.jpeg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(41,'Pachon Tupperware grande',35,'Pachones Tupperware grandes de 2lt varios colores',1,5,0,'uploads/DE8h7nUXkAAPmii.jpg');
INSERT INTO Productos(Cod_usuario, Producto, Precio, Descripcion, Likes, Dislikes, Bloqueado, Foto)
VALUES(42,'MOUSE CORSAIR GLAIVE RGB PRO',550,'El CORSAIR GLAIVE RGB PRO combina un alto rendimiento con gran comodidad, desarrollado con una forma contorneada diseñada para jugar de manera prolongada',12,3,0,'uploads/611L+hTn75L._AC_SL1500_.jpg');

INSERT INTO Carrito(Cod_usuario, Fecha, Bloqueado)
VALUES(2,TO_DATE('2020/11/5','YYYY/MM/DD'),1);
INSERT INTO Carrito(Cod_usuario, Fecha, Bloqueado)
VALUES(2,TO_DATE('2020/11/5','YYYY/MM/DD'),0);
INSERT INTO Carrito(Cod_usuario, Fecha, Bloqueado)
VALUES(3,TO_DATE('2020/11/5','YYYY/MM/DD'),0);
INSERT INTO Carrito(Cod_usuario, Fecha, Bloqueado)
VALUES(4,TO_DATE('2020/11/5','YYYY/MM/DD'),0);
INSERT INTO Carrito(Cod_usuario, Fecha, Bloqueado)
VALUES(5,TO_DATE('2020/11/5','YYYY/MM/DD'),0);
INSERT INTO Carrito(Cod_usuario, Fecha, Bloqueado)
VALUES(6,TO_DATE('2020/11/5','YYYY/MM/DD'),0);
INSERT INTO Carrito(Cod_usuario, Fecha, Bloqueado)
VALUES(7,TO_DATE('2020/11/5','YYYY/MM/DD'),0);

INSERT INTO Detalle_Carrito(Cod_Carrito, Cod_producto, Cantidad, Precio, Sub_Total)
VALUES(2,10,1,795,795);
INSERT INTO Detalle_Carrito(Cod_Carrito, Cod_producto, Cantidad, Precio, Sub_Total)
VALUES(3,6,1,400,400);
INSERT INTO Detalle_Carrito(Cod_Carrito, Cod_producto, Cantidad, Precio, Sub_Total)
VALUES(4,8,2,350,700);
INSERT INTO Detalle_Carrito(Cod_Carrito, Cod_producto, Cantidad, Precio, Sub_Total)
VALUES(4,3,1,389.9,389.9);
INSERT INTO Detalle_Carrito(Cod_Carrito, Cod_producto, Cantidad, Precio, Sub_Total)
VALUES(5,1,1,550,550);
INSERT INTO Detalle_Carrito(Cod_Carrito, Cod_producto, Cantidad, Precio, Sub_Total)
VALUES(6,4,1,299,299);
INSERT INTO Detalle_Carrito(Cod_Carrito, Cod_producto, Cantidad, Precio, Sub_Total)
VALUES(7,7,1,7000,7000);
INSERT INTO Detalle_Carrito(Cod_Carrito, Cod_producto, Cantidad, Precio, Sub_Total)
VALUES(8,5,1,1339.1,1339.1);
INSERT INTO Detalle_Carrito(Cod_Carrito, Cod_producto, Cantidad, Precio, Sub_Total)
VALUES(8,9,1,869,869);

INSERT INTO COMPRAS(Cod_usuario, Fecha)
VALUES(1,TO_DATE('2020/8/10','YYYY/MM/DD'));
INSERT INTO COMPRAS(Cod_usuario, Fecha)
VALUES(1,TO_DATE('2020/8/11','YYYY/MM/DD'));

INSERT INTO Detalle_compras(Cod_Compra, Cod_producto, Cantidad, Precio, Sub_Total)
VALUES(8,9,1,869,869);

-- --------------------------------------------
-- TRIGGER DE CREDITOS
-- --------------------------------------------
create or replace trigger actualizarCantidad after insert on Detalle_compras for each row
begin
UPDATE Usuarios U set U.Creditos = (U.Creditos - (:new.Sub_Total)) where U.Cod_usuario = (SELECT Cod_usuario from Compras where :new.Cod_compra = Compras.Cod_compra);
UPDATE Usuarios U set U.Creditos = (U.Creditos + (:new.Sub_Total)) where U.Cod_usuario = (SELECT Cod_usuario from Productos where :new.Cod_producto = Cod_producto);
end;
 
-- -----------------------------------------------------------
-- PRUEBAS DE QUERYS
-- -----------------------------------------------------------  

SELECT * FROM PAIS;

SELECT * FROM USUARIOS;
SELECT * FROM usuarios WHERE correo='admin' AND contrasena='admin';

SELECT * FROM PRODUCTOS;
SELECT * FROM CARRITO;

SELECT * FROM Detalle_Carrito;
select * from compras;
SELECT * FROM BITACORA;
SELECT * FROM CATEGORIAS;

SELECT prod.Producto, det.Cantidad, det.Precio, det.Sub_Total FROM Detalle_Carrito det, Productos prod WHERE COD_CARRITO=3 AND det.Cod_producto = prod.Cod_producto AND Cantidad != 0;
UPDATE Detalle_Carrito SET Cantidad = 2 WHERE COD_Carrito =3 AND COD_PRODUCTO = 6;

SELECT * FROM COMPRAS;
SELECT Cod_compra FROM COMPRAS WHERE Cod_usuario = 1 ORDER BY Cod_compra DESC FETCH FIRST 1 ROWS ONLY

DELETE FROM CARRITO WHERE COD_CARRITO = 21;
UPDATE CARRITO SET BLOQUEADO = 0 WHERE COD_CARRITO = 3;

SELECT usr.NOMBRE, usr.CORREO FROM USUARIOS usr, PRODUCTOS prod WHERE prod.COD_PRODUCTO = 1 AND usr.Cod_usuario = prod.Cod_usuario;

UPDATE USUARIOS SET CORREO='cascarus2@gmail.com' WHERE Cod_usuario = 2;
UPDATE USUARIOS SET CORREO='cascarus2@gmail.com' WHERE Cod_usuario = 3;
UPDATE USUARIOS SET CORREO='cascarus2@gmail.com' WHERE Cod_usuario = 5;

-- -----------------------------------------
-- CONSULTA PARA TRAER EL TOTAL DEL CARRITO
-- ----------------------------------------
SELECT Sum(dtv.Sub_Total) as Sub_Total
FROM Carrito c
INNER JOIN Detalle_Carrito dtv ON dtv.Cod_Carrito = c.Cod_Carrito
INNER JOIN Usuarios usr ON usr.Cod_usuario = c.Cod_usuario
WHERE c.Cod_usuario = 4 AND c.Bloqueado = 0;

-- -----------------------------------------
-- consulta 1
-- ----------------------------------------
SELECT usr.Correo, bit.Descripcion, bit.Fecha
FROM USUARIOS usr, Bitacora bit
WHERE usr.Cod_usuario = bit.Cod_usuario
ORDER BY bit.Fecha DESC

-- -----------------------------------------
-- consulta 2
-- ----------------------------------------
SELECT prod.Producto,usr.Nombre, usr.Apellido, COUNT(det.Cod_producto) as Cantidad
FROM Detalle_compras det
INNER JOIN PRODUCTOS prod ON prod.Cod_producto = det.Cod_producto
INNER JOIN USUARIOS usr ON prod.Cod_usuario = usr.Cod_usuario
GROUP BY prod.Producto, usr.Nombre, usr.Apellido
ORDER BY Cantidad DESC
FETCH FIRST 10 ROWS ONLY;

-- -----------------------------------------
-- consulta 3
-- ----------------------------------------
SELECT prod.Producto, usr.Nombre, usr.Apellido, prod.Likes
FROM PRODUCTOS prod, USUARIOS usr
WHERE prod.Cod_usuario = usr.Cod_usuario
ORDER BY prod.Likes DESC
FETCH FIRST 10 ROWS ONLY;

-- -----------------------------------------
-- consulta 4
-- ----------------------------------------
SELECT prod.Producto, usr.Nombre, usr.Apellido, prod.Dislikes
FROM PRODUCTOS prod, USUARIOS usr
WHERE prod.Cod_usuario = usr.Cod_usuario
ORDER BY prod.dislikes DESC
FETCH FIRST 10 ROWS ONLY;

-- -----------------------------------------
-- consulta 5
-- ----------------------------------------
SELECT Nombre, Apellido, Correo, Fecha, Creditos
FROM USUARIOS
WHERE Tipo != 0
ORDER BY CREDITOS DESC
FETCH FIRST 10 ROWS ONLY;

SELECT Nombre, Apellido, Correo, Fecha, Creditos
FROM USUARIOS
WHERE Tipo != 0
ORDER BY CREDITOS ASC
FETCH FIRST 10 ROWS ONLY;

-- -----------------------------------------
-- consulta 7
-- ----------------------------------------
SELECT usr.Nombre, usr.Apellido, usr.Correo, usr.Creditos, COUNT(prod.Cod_producto) as CANT
FROM USUARIOS usr, PRODUCTOS prod
WHERE usr.Tipo != 0 AND usr.Cod_usuario = prod.Cod_usuario
GROUP BY usr.Nombre, usr.Apellido, usr.Correo, usr.Creditos
ORDER BY CANT DESC
FETCH FIRST 10 ROWS ONLY;

-- -----------------------------------------
-- consulta 8
-- ----------------------------------------
SELECT temp1.pais, temp2.Cantidad, temp1.Creditos, temp1.cant_usr
FROM( SELECT p.Cod_Pais, p.pais, COUNT(usr.Cod_usuario) as cant_usr, SUM(usr.Creditos) as Creditos
    FROM pais p, USUARIOS usr
    WHERE usr.Tipo != 0 AND p.Cod_pais = usr.Cod_pais  
    GROUP BY p.Cod_pais, p.pais) temp1 ,
    (SELECT p.Cod_Pais, p.pais, COUNT(prod.COD_PRODUCTO) as Cantidad
    FROM pais p, PRODUCTOS prod, USUARIOS usr
    WHERE usr.Tipo != 0 AND p.Cod_pais = usr.Cod_pais AND usr.Cod_usuario = prod.Cod_usuario 
    GROUP BY p.Cod_pais, p.pais) temp2
WHERE temp1.Cod_Pais = temp2.Cod_Pais
ORDER BY temp1.Creditos DESC 


COMMIT;
ROLLBACK;


DROP TABLE Detalle_Carrito;
DROP TABLE Detalle_compras;
DROP TABLE Carrito;
DROP TABLE Compras;
DROP TABLE Detalle_categoria;
DROP TABLE Denuncias;
DROP TABLE Comentarios;
DROP TABLE BITACORA;
DROP TABLE Productos;
DROP TABLE Usuarios;
DROP TABLE CATEGORIAS;
DROP TABLE PAIS;
