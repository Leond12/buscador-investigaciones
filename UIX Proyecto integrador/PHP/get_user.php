<?php
session_start();
header('Content-Type: application/json');
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 1 Jan 2025 00:00:00 GMT");

if (isset($_SESSION['usuario']) && isset($_SESSION['rol']) &&  isset($_SESSION['id_usuario'])) {
    echo json_encode([
        "usuario" => $_SESSION['usuario'],
        "rol" => $_SESSION['rol'],
        "id_usuario" => $_SESSION['id_usuario'] 
    ]);
} else {
    echo json_encode([
        "usuario" => null,
        "rol" => "Invitado"
    ]);
}
?>

