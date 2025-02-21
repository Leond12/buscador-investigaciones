document.addEventListener("DOMContentLoaded", function () {
    fetch("php/get_user.php", { cache: "no-store" }) // Evita caché
        .then(response => response.json())
        .then(data => {
            if (data.usuario) {
                document.getElementById("rol1").textContent = data.rol; // Mostrar el rol en la interfaz
                document.getElementById("login-button").style.display = "none";
                document.getElementById("logout-button").style.display = "block";

                // Mostrar botones solo si el usuario es Administrador o Tutor
                if (data.rol === "Administrador" || data.rol === "Tutor") {
                    document.getElementById("registrar-button").style.display = "block";
                    document.getElementById("upload-button").style.display = "block";
                } else {
                    document.getElementById("registrar-button").style.display = "none";
                    document.getElementById("upload-button").style.display = "none";
                }
            } else {
                document.getElementById("rol1").textContent = "Invitado";
                document.getElementById("login-button").style.display = "block";
                document.getElementById("logout-button").style.display = "none";
                document.getElementById("registrar-button").style.display = "none";
                document.getElementById("upload-button").style.display = "none";
            }
        })
        .catch(error => console.error("Error al obtener el usuario:", error));
});