<?php
header('Content-Type: application/json');

$servername = "localhost"; // Cambia esto si es necesario
$username = "root"; // Cambia esto si es necesario
$password = ""; // Cambia esto si es necesario
$database = "gestion_documentos";

// Conectar a la base de datos
$conn = new mysqli($servername, $username, $password, $database);

// Verificar la conexión
if ($conn->connect_error) {
    die(json_encode(["error" => "Conexión fallida: " . $conn->connect_error]));
}

// Consulta SQL para obtener las categorías
$sql = "SELECT id_categoria, nombre FROM categoria";
$result = $conn->query($sql);

$categorias = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $categorias[] = $row;
    }
}

// Cerrar la conexión
$conn->close();

// Devolver las categorías en formato JSON
echo json_encode($categorias);
?>
