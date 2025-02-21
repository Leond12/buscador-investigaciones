<?php
session_start();
header('Content-Type: application/json');

// Configuración de la base de datos
$servidor = "localhost";
$usuario_bd = "root"; // Usuario de la base de datos
$contrasena_bd = ""; // Contraseña de la base de datos
$base_de_datos = "gestion_documentos";

// Conectar a la base de datos
$conexion = new mysqli($servidor, $usuario_bd, $contrasena_bd, $base_de_datos);

// Verificar conexión
if ($conexion->connect_error) {
    die(json_encode(["error" => "Error de conexión a la base de datos"]));
}

// Obtener el término de búsqueda
$busqueda = isset($_GET['query']) ? trim($_GET['query']) : '';

if (empty($busqueda)) {
    echo json_encode(["error" => "No se ingresó un término de búsqueda"]);
    exit();
}

// Consulta SQL para buscar en nombre y apellido
$sql = "SELECT id_Autores, nombre, apellido FROM Autores 
        WHERE nombre LIKE ? OR apellido LIKE ?";
$stmt = $conexion->prepare($sql);
$param = "%$busqueda%";
$stmt->bind_param("ss", $param, $param);
$stmt->execute();
$resultado = $stmt->get_result();

// Verificar si hay resultados
$autores = [];
while ($fila = $resultado->fetch_assoc()) {
    $autores[] = $fila;
}

// Cerrar la conexión
$stmt->close();
$conexion->close();

// Retornar resultados en formato JSON
echo json_encode($autores);
?>
