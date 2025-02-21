document.addEventListener("DOMContentLoaded", function () {
    clearSelections(); // Limpiar selección al cargar la página
    loadTags();
    loadSavedSelections(); // Cargar selección guardada en localStorage
});

let selectedTags = [];

function loadTags() {
    fetch("php/buscar_tag.php")
        .then(response => response.json())
        .then(data => {
            let tagSelect = document.getElementById("tags-select");
            tagSelect.innerHTML = ""; // Limpiar opciones

            data.forEach(tag => {
                let option = document.createElement("option");
                option.value = tag.id_tag;
                option.textContent = tag.nombre;
                tagSelect.appendChild(option);
            });

            loadSavedSelections(); // Restaurar selección desde localStorage
        })
        .catch(error => console.error("Error al obtener tags:", error));
}

// Función para seleccionar tags y mostrarlos en la lista
document.getElementById("tags-select").addEventListener("change", function () {
    let options = this.selectedOptions;
    let selectedList = document.getElementById("selected-tags");
    selectedList.innerHTML = "";

    selectedTags = [];
    
    for (let i = 0; i < options.length; i++) {
        let tagId = options[i].value;
        let tagName = options[i].textContent;

        if (!selectedTags.some(tag => tag.id === tagId)) {
            selectedTags.push({ id: tagId, nombre: tagName });

            let listItem = document.createElement("li");
            listItem.textContent = tagName;
            selectedList.appendChild(listItem);
        }
    }

    // Guardar en localStorage
    localStorage.setItem("selectedTags", JSON.stringify(selectedTags));
});

// Función para añadir un nuevo tag
function addNewTag() {
    let newTagName = prompt("Ingrese el nombre del nuevo tag:");

    if (!newTagName || newTagName.trim() === "") {
        alert("Por favor, introduce un nombre para el tag.");
        return;
    }

    fetch("php/crear_tag.php", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: `nombre=${encodeURIComponent(newTagName)}`
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert("Tag añadido correctamente.");
            loadTags(); // Recargar la lista de tags
        } else {
            alert("Error al añadir el tag.");
        }
    })
    .catch(error => console.error("Error al añadir tag:", error));
}

// Función para guardar la categoría seleccionada en localStorage
document.getElementById("categories-select").addEventListener("change", function () {
    let selectedCategory = this.value;
    localStorage.setItem("selectedCategory", selectedCategory);
});

// Cargar datos guardados en localStorage al abrir la página
function loadSavedSelections() {
    let savedTags = JSON.parse(localStorage.getItem("selectedTags")) || [];
    let savedCategory = localStorage.getItem("selectedCategory");

    if (savedTags.length > 0) {
        selectedTags = savedTags;
        let selectedList = document.getElementById("selected-tags");
        selectedList.innerHTML = "";
        savedTags.forEach(tag => {
            let listItem = document.createElement("li");
            listItem.textContent = tag.nombre;
            selectedList.appendChild(listItem);
        });

        document.querySelectorAll("#tags-select option").forEach(option => {
            if (savedTags.some(tag => tag.id === option.value)) {
                option.selected = true;
            }
        });
    }

    if (savedCategory) {
        document.getElementById("categories-select").value = savedCategory;
    }
}

// Función para limpiar selección de tags cuando entras en "Subir Documento"
function clearSelections() {
    localStorage.removeItem("selectedTags"); // Eliminar tags seleccionados almacenados
    localStorage.removeItem("selectedCategory"); // Eliminar categoría almacenada
    selectedTags = []; // Vaciar array de selección

    // Limpiar visualmente la lista de seleccionados
    let selectedList = document.getElementById("selected-tags");
    if (selectedList) {
        selectedList.innerHTML = "";
    }

    // Desmarcar opciones en el select
    let tagSelect = document.getElementById("tags-select");
    if (tagSelect) {
        for (let i = 0; i < tagSelect.options.length; i++) {
            tagSelect.options[i].selected = false;
        }
    }
}


