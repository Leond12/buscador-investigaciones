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
    die(json_encode(["error" => "Error de conexión a la base de datos"]));
}

// Obtener los tags existentes
$sql = "SELECT id_tag, nombre FROM tag";
$resultado = $conexion->query($sql);

$tags = [];
while ($fila = $resultado->fetch_assoc()) {
    $tags[] = $fila;
}

$conexion->close();

// Devolver los tags en formato JSON
echo json_encode($tags);
?>
