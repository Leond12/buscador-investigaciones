/**
 * Función para mostrar u ocultar la contraseña
 */
function togglePassword() {
    const passwordInput = document.getElementById("pass-login");
    passwordInput.type = document.getElementById("show-password-login").checked ? "text" : "password";
}

// Asignar eventos al cargar la página
document.addEventListener("DOMContentLoaded", function () {
    document.querySelector("form").addEventListener("submit", iniciarSesion);
    document.getElementById("show-password-login").addEventListener("change", togglePassword);
});
