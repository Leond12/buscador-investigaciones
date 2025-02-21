<?php
session_start();
header('Content-Type: application/json');

// Configuración de la base de datos
$servidor = "localhost";
$usuario_bd = "root";
$contrasena_bd = "";
$base_de_datos = "gestion_documentos";

// Conectar a la base de datos
$conexion = new mysqli($servidor, $usuario_bd, $contrasena_bd, $base_de_datos);

// Verificar conexión
if ($conexion->connect_error) {
    die(json_encode(["success" => false, "error" => "Error de conexión a la base de datos"]));
}

// Obtener el nombre del tag
$nombre = trim($_POST['nombre']);

if (empty($nombre)) {
    echo json_encode(["success" => false, "error" => "El nombre del tag está vacío"]);
    exit();
}

// Insertar el nuevo tag en la base de datos
$sql = "INSERT INTO tag (nombre) VALUES (?)";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $nombre);

if ($stmt->execute()) {
    echo json_encode(["success" => true]);
} else {
    echo json_encode(["success" => false, "error" => "Error al insertar tag"]);
}

$stmt->close();
$conexion->close();
?>
