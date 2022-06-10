-- CREATE DATABASE prestago WITH OWNER = 'prestago_silva' ENCODING = 'UTF8' TABLESPACE = table_prestago;
DROP TABLE IF EXISTS registro CASCADE;
DROP TABLE IF EXISTS prestamo CASCADE;
DROP TABLE IF EXISTS pago CASCADE;
DROP TABLE IF EXISTS historial CASCADE;

DROP SCHEMA IF EXISTS main CASCADE;
DROP SCHEMA IF EXISTS adm CASCADE;

DROP SEQUENCE IF EXISTS registro_seq CASCADE;
DROP SEQUENCE IF EXISTS pago_seq CASCADE;
DROP SEQUENCE IF EXISTS prestamo_seq CASCADE;
DROP SEQUENCE IF EXISTS historial_seq CASCADE;

CREATE SCHEMA main;
CREATE SCHEMA adm;

CREATE SEQUENCE registro_seq;
CREATE SEQUENCE pago_seq;
CREATE SEQUENCE prestamo_seq;
CREATE SEQUENCE historial_seq;

CREATE TABLE registro (
  id INT4 NOT NULL DEFAULT NEXTVAL('registro_seq'),
  n_documento INTEGER NOT NULL,
  tipo_documento VARCHAR(4) NOT NULL,
  nombre_completo VARCHAR(50) NOT NULL,
  fecha_nacimiento date NOT NULL,
  numero_celular VARCHAR NOT NULL,
  email VARCHAR(50) NOT NULL,
  profesion_u_oficio VARCHAR(100) NOT NULL,
  direccion VARCHAR(100) NOT NULL,
  rol VARCHAR(50) NOT NULL,
  contrasena VARCHAR(12) NOT NULL,
  PRIMARY KEY (id)
);
INSERT INTO
  registro (
    n_documento,
    tipo_documento,
    nombre_completo,
    fecha_nacimiento,
    numero_celular,
    email,
    profesion_u_oficio,
    direccion,
    rol,
    contrasena
  )
VALUES
  (
    514326316,
    'CC',
    'Juan',
    '2020-01-01',
    514326316,
    'hola@gmail.com',
    'Programing',
    'Calle falsa 123',
    'admin',
    '123456'
  );

CREATE TABLE prestamo (
  id INT4 NOT NULL DEFAULT NEXTVAL(' prestamo_seq '),
  monto_prestar INTEGER NOT NULL,
  plazo_en_meses INTEGER NOT NULL,
  nombre_completo VARCHAR(50) NOT NULL,
  fecha_creacion timestamp NOT NULL DEFAULT current_timestamp,
  tasa_interes INTEGER NOT NULL,
  estado VARCHAR(20) NOT NULL,
  id_registro INTEGER NOT NULL, 
  PRIMARY KEY (id),
  CONSTRAINT FK_registro FOREIGN KEY (id_registro) REFERENCES registro (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO
  prestamo(
    monto_prestar,
    plazo_en_meses,
    nombre_completo,
    fecha_creacion,
    tasa_interes,
    estado,
    id_registro
  )
VALUES
  (
    100000,
    12,
    'Juan Perez',
    '2020-01-01 00:00:00',
    0.05,
    'Pendiente',
    1
  );



CREATE TABLE pago (
  id INT4 NOT NULL DEFAULT NEXTVAL(' pago_seq '),
  fecha_pago_cuotas date NOT NULL,
  tiempo_pagar INTEGER NOT NULL,
  cuota_pagar INTEGER NOT NULL,
  id_prestamo INTEGER NOT NULL,
  id_registro INTEGER NOT NULL,
  PRIMARY KEY (id),
  CONSTRAINT fk_prestamo FOREIGN KEY (id_prestamo) REFERENCES prestamo (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_registro FOREIGN KEY (id_registro) REFERENCES registro (id) ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO
  pago(fecha_pago_cuotas, tiempo_pagar, cuota_pagar,id_prestamo, id_registro)
VALUES
  ('2020-01-01', 1, 100,1,1);



CREATE TABLE historial (
  id INT4 NOT NULL DEFAULT NEXTVAL(' historial_seq '),
  PRIMARY KEY (id),
  CONSTRAINT fk_prestamo FOREIGN KEY (id) REFERENCES prestamo (id) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT fk_registro FOREIGN KEY (id) REFERENCES registro (id) ON DELETE RESTRICT ON UPDATE CASCADE
);