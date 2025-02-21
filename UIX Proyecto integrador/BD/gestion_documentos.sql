-- Creación de la base de datos
CREATE DATABASE IF NOT EXISTS gestion_documentos;
USE gestion_documentos;

-- Tabla Usuario
CREATE TABLE Usuario (
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    cargo VARCHAR(50),
    usuario VARCHAR(50) UNIQUE NOT NULL,
    contrasena VARCHAR(255) NOT NULL,
    fecha_registro DATE
);

-- Tabla Universidad
CREATE TABLE universidad (
    id_universidad INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    facultad VARCHAR(100),
    materia VARCHAR(100),
    carrera VARCHAR(100)
);

-- Tabla Categoria
CREATE TABLE categoria (
    id_categoria INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    descripcion TEXT
);

-- Tabla Tag
CREATE TABLE tag (
    id_tag INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL
);

-- Tabla Autores
CREATE TABLE Autores (
    id_Autores INT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100)
);

-- Tabla Documento
CREATE TABLE Documento (
    id_documento INT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(255) NOT NULL,
    titulo_largo TEXT,
    nombre_archivo VARCHAR(255),
    id_universidad INT,
    tutor VARCHAR(100),
    fecha_subida DATE,
    descripcion TEXT,
    ruta VARCHAR(255),
    id_categoria INT,
    tamano_archivo BIGINT,
    tipo_archivo VARCHAR(50),
    nro_vistas INT,
    FOREIGN KEY (id_universidad) REFERENCES universidad(id_universidad) ON DELETE SET NULL,
    FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria) ON DELETE SET NULL
);

-- Tabla Documento_subido
CREATE TABLE Documento_subido (
    id_documento_subido INT AUTO_INCREMENT PRIMARY KEY,
    usuario_id INT,
    documento_id INT,
    fecha_subida DATE,
    FOREIGN KEY (usuario_id) REFERENCES Usuario(id_usuario) ON DELETE CASCADE,
    FOREIGN KEY (documento_id) REFERENCES Documento(id_documento) ON DELETE CASCADE
);

-- Tabla Documento_Autores
CREATE TABLE Documento_Autores (
    id_documento_autores INT AUTO_INCREMENT PRIMARY KEY,
    id_documento INT,
    id_Autores INT,
    FOREIGN KEY (id_documento) REFERENCES Documento(id_documento) ON DELETE CASCADE,
    FOREIGN KEY (id_Autores) REFERENCES Autores(id_Autores) ON DELETE CASCADE
);

-- Tabla Documento_Categoria
CREATE TABLE Documento_Categoria (
    id_documento_categoria INT AUTO_INCREMENT PRIMARY KEY,
    id_Documento INT,
    id_Categoria INT,
    FOREIGN KEY (id_Documento) REFERENCES Documento(id_documento) ON DELETE CASCADE,
    FOREIGN KEY (id_Categoria) REFERENCES categoria(id_categoria) ON DELETE CASCADE
);

-- Tabla Documento_Tag
CREATE TABLE Documento_Tag (
    id_documento_tag INT AUTO_INCREMENT PRIMARY KEY,
    id_documento INT,
    id_tag INT,
    FOREIGN KEY (id_documento) REFERENCES Documento(id_documento) ON DELETE CASCADE,
    FOREIGN KEY (id_tag) REFERENCES tag(id_tag) ON DELETE CASCADE
);



==================================================================================================
poblacion
==================================================================================================


-- Poblar Tabla Usuario
INSERT INTO Usuario (nombre, cargo, usuario, contrasena, fecha_registro) VALUES
('Juan Pérez', 'Administrador', 'juanp', 'password123', '2024-01-01'),
('María López', 'Editor', 'marial', 'password123', '2024-01-02'),
('Carlos Sánchez', 'Usuario', 'carloss', 'password123', '2024-01-03'),
('Ana Gómez', 'Usuario', 'anag', 'password123', '2024-01-04'),
('Luis Torres', 'Editor', 'luist', 'password123', '2024-01-05');

-- Poblar Tabla Universidad
INSERT INTO universidad (nombre, facultad, materia, carrera) VALUES
('Universidad Nacional', 'Ingeniería', 'Programación', 'Ingeniería de Sistemas'),
('Universidad de la Ciudad', 'Ciencias', 'Física', 'Física Aplicada'),
('Universidad Técnica', 'Tecnología', 'Redes', 'Ingeniería en Redes'),
('Universidad Central', 'Humanidades', 'Historia', 'Historia Universal'),
('Universidad Autónoma', 'Derecho', 'Legislación', 'Derecho Penal');

-- Poblar Tabla Categoria
INSERT INTO categoria (nombre, descripcion) VALUES
('Investigación', 'Documentos de investigación académica'),
('Proyecto', 'Proyectos universitarios finales'),
('Tesis', 'Tesis de grado y postgrado'),
('Ensayo', 'Ensayos académicos de distintas disciplinas'),
('Informe', 'Informes técnicos y científicos');

-- Poblar Tabla Tag
INSERT INTO tag (nombre) VALUES
('Tecnología'),
('Ciencia'),
('Salud'),
('Educación'),
('Medio Ambiente');

-- Poblar Tabla Autores
INSERT INTO Autores (nombre, apellido) VALUES
('Pedro', 'Martínez'),
('Laura', 'Fernández'),
('Javier', 'García'),
('Sofía', 'Hernández'),
('Diego', 'Ruiz');

-- Poblar Tabla Documento
INSERT INTO Documento (titulo, titulo_largo, nombre_archivo, id_universidad, tutor, fecha_subida, descripcion, ruta, id_categoria, tamano_archivo, tipo_archivo,nro_vistas) VALUES
('Estudio de Redes', 'Estudio de Redes de Computadoras en Entornos Universitarios', 'redes.pdf', 1, 'Dr. Roberto Díaz', '2024-02-01', 'Un estudio detallado de redes.', '/archivos/redes.pdf', 1, 204800, 'pdf', 10),
('Impacto Ambiental', 'Análisis del Impacto Ambiental en Zonas Urbanas', 'impacto.pdf', 2, 'Dra. Ana López', '2024-02-02', 'Impacto ambiental urbano.', '/archivos/impacto.pdf', 2, 307200, 'pdf', 20),
('Inteligencia Artificial', 'Desarrollo de Algoritmos de IA', 'ia.pdf', 3, 'Dr. Carlos Rivera', '2024-02-03', 'Algoritmos de IA en la actualidad.', '/archivos/ia.pdf', 3, 512000, 'pdf', 30),
('Historia Moderna', 'La Evolución de la Sociedad Moderna', 'historia.pdf', 4, 'Dra. Lucía Torres', '2024-02-04', 'Sociedades modernas y su evolución.', '/archivos/historia.pdf', 4, 256000, 'pdf', 40),
('Derecho Penal', 'Estudios sobre Derecho Penal Comparado', 'derecho.pdf', 5, 'Dr. Fernando Pérez', '2024-02-05', 'Derecho penal internacional.', '/archivos/derecho.pdf', 5, 150000, 'pdf', 50);

-- Poblar Tabla Documento_subido
INSERT INTO Documento_subido (usuario_id, documento_id, fecha_subida) VALUES
(1, 1, '2024-02-01'),
(2, 2, '2024-02-02'),
(3, 3, '2024-02-03'),
(4, 4, '2024-02-04'),
(5, 5, '2024-02-05');

-- Poblar Tabla Documento_Autores
INSERT INTO Documento_Autores (id_documento, id_Autores) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Poblar Tabla Documento_Categoria
INSERT INTO Documento_Categoria (id_Documento, id_Categoria) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);

-- Poblar Tabla Documento_Tag
INSERT INTO Documento_Tag (id_documento, id_tag) VALUES
(1, 1),
(2, 2),
(3, 3),
(4, 4),
(5, 5);
