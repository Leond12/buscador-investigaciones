document.addEventListener("DOMContentLoaded", function () {
    loadSelectedAuthors();
});

function loadSelectedAuthors() {
    let authorResults = document.getElementById("author-results");
    let selectedAuthors = JSON.parse(localStorage.getItem("selectedAuthors")) || [];

    authorResults.innerHTML = selectedAuthors.length > 0
        ? selectedAuthors.map((author, index) => `
            <li>${author.nombre} ${author.apellido}
                <button onclick="removeSelectedAuthor(${index})">Quitar</button>
            </li>`).join('')
        : "<li>No hay autores seleccionados</li>";
}

function removeSelectedAuthor(index) {
    let selectedAuthors = JSON.parse(localStorage.getItem("selectedAuthors")) || [];
    selectedAuthors.splice(index, 1);
    localStorage.setItem("selectedAuthors", JSON.stringify(selectedAuthors));
    loadSelectedAuthors(); // Refrescar la lista de autores seleccionados
}