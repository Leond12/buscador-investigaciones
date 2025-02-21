<?php
session_start(); // Iniciar sesión si no está iniciada
session_unset(); // Elimina todas las variables de sesión
session_destroy(); // Destruye la sesión

// Elimina la cookie de sesión si existe
if (ini_get("session.use_cookies")) {
    $params = session_get_cookie_params();
    setcookie(session_name(), '', time() - 42000,
        $params["path"], $params["domain"],
        $params["secure"], $params["httponly"]
    );
}

// Redirigir al usuario a la página de inicio
header("Location: ../index.html");
exit();



