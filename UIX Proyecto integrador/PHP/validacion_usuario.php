<?php
session_start(); // Iniciar sesión

// Configuración de la conexión a la base de datos
$servidor = "localhost";
$usuario_bd = "root"; // Usuario de la base de datos
$contrasena_bd = ""; // Contraseña de la base de datos
$base_de_datos = "gestion_documentos"; // Nombre de la base de datos

// Conectar a la base de datos
$conexion = new mysqli($servidor, $usuario_bd, $contrasena_bd, $base_de_datos);

// Verificar conexión
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

// Obtener los datos del formulario
$usuario = trim($_POST['usuario']);
$contrasena = trim($_POST['contrasena']);

// Validar que los campos no estén vacíos
if (empty($usuario) || empty($contrasena)) {
    echo "<script>alert('Por favor, completa todos los campos.'); window.location.href='../login.html';</script>";
    exit();
}

// Consulta preparada para evitar SQL Injection
$sql = "SELECT id_usuario, usuario, contrasena, cargo FROM usuario WHERE usuario = ?";
$stmt = $conexion->prepare($sql);
$stmt->bind_param("s", $usuario);
$stmt->execute();
$resultado = $stmt->get_result();

// Verificar si el usuario existe
if ($resultado->num_rows == 1) {
    $fila = $resultado->fetch_assoc();
    $id_usuario = $fila['id_usuario']; // Guardar ID del usuario
    $contrasena_hash = $fila['contrasena'];
    $rol = $fila['cargo']; // Obtener el rol del usuario

    // Validar la contraseña
    if ($contrasena == $contrasena_hash) {
        $_SESSION['id_usuario'] = $id_usuario; // Guardar ID en sesión
        $_SESSION['usuario'] = $usuario;
        $_SESSION['rol'] = $rol; // Guardar el rol en la sesión
        
        echo "<script>alert('Inicio de sesión exitoso. Rol: $rol'); window.location.href='../index.html';</script>";
        exit();
    } else {
        echo "<script>alert('Contraseña incorrecta.'); window.location.href='../login.html';</script>";
        exit();
    }
} else {
    echo "<script>alert('Usuario no encontrado.'); window.location.href='../login.html';</script>";
    exit();
}

// Cerrar conexión
$stmt->close();
$conexion->close();
?>
