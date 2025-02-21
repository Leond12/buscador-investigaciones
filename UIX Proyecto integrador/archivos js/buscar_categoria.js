document.addEventListener("DOMContentLoaded", function () {
    fetch("./PHP/buscar_categoria.php")
        .then(response => response.json())
        .then(data => {
            let select = document.getElementById("categories-select");
            data.forEach(categoria => {
                let option = document.createElement("option");
                option.value = categoria.id_categoria;
                option.textContent = categoria.nombre;
                select.appendChild(option);
            });
        })
        .catch(error => console.error("Error cargando categorías:", error));
});