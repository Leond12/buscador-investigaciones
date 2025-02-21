/**
 * Archivo: funciones.js
 * Descripción: Contiene las funciones para la gestión de autores, documentos y almacenamiento en localStorage.
 */

//---------------------------------------------------------------------
document.addEventListener("DOMContentLoaded", function () {
    crearAdminPorDefecto(); // Crear admin por defecto si no hay usuarios
    actualizarInterfaz(); // Actualiza la interfaz al cargar la página
    togglePasswordVisibility(); // Activar la funcionalidad de mostrar/ocultar contraseña
    togglePasswordVisibilityRegister();

    const path = window.location.pathname;

    if (path.includes("editar_documento.html")) {
        loadEditDocument();
    } else if (path.includes("ver_documento.html")) {
        loadDocumentDetails();
    } else if (path.includes("registrar_documento.html")) {
        if (document.getElementById("file-input")) setupFileUpload();
        if (document.getElementById("author-results")) loadSelectedAuthors();
    } else {
        if (document.getElementById("author-results")) loadSelectedAuthors();
    }

    const searchInput = document.getElementById("search-input");
    if (searchInput) searchInput.addEventListener("input", searchDocuments);

    const loginForm = document.querySelector("form");
    if (loginForm) loginForm.addEventListener("submit", iniciarSesion);

    const registerForm = document.getElementById("register-form");
    if (registerForm) registerForm.addEventListener("submit", registerUser);
});
//---------------------------------------------------------------------
/**
 * Función para crear un usuario administrador por defecto si no hay usuarios registrados
 */
function crearAdminPorDefecto() {
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si no hay usuarios registrados
    if (users.length === 0) {
        const adminUser = {
            username: "admin",
            password: "123",
            role: "administrador"
        };

        users.push(adminUser);
        localStorage.setItem("users", JSON.stringify(users));
        console.log("Usuario administrador por defecto creado.");
    }
}
//---------------------------------------------------------------------
/**
 * Función para registrar un nuevo usuario
 */
function registerUser(event) {
    event.preventDefault();

    const role = document.getElementById('rol').value;
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('pass-create').value.trim();
    const confirmPassword = document.getElementById('confirmar-pass-create').value.trim();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
        alert("Las contraseñas no coinciden.");
        return;
    }

    // Validar que el usuario no esté vacío
    if (!username || !password) {
        alert("Por favor, completa todos los campos.");
        return;
    }

    // Obtener la lista de usuarios actual
    let users = JSON.parse(localStorage.getItem("users")) || [];

    // Verificar si el usuario ya existe
    const userExists = users.some(user => user.username === username);
    if (userExists) {
        alert("El usuario ya existe.");
        return;
    }

    // Crear el nuevo usuario
    const newUser = {
        username,
        password,
        role
    };

    // Guardar el nuevo usuario en localStorage
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Usuario registrado con éxito.");
    setTimeout(() => {
        window.location.href = "index.html"; // Redirigir después de 1 segundo
    }, 1000);
}
//---------------------------------------------------------------------
/**
 * Función para mostrar/ocultar la contraseña en el formulario de inicio de sesión
 */
function togglePasswordVisibility() {
    const passwordInput = document.getElementById("pass-login");
    const showPasswordCheckbox = document.getElementById("show-password-login");

    if (showPasswordCheckbox) {
        showPasswordCheckbox.addEventListener("change", function () {
            passwordInput.type = this.checked ? "text" : "password";
        });
    }
}
//---------------------------------------------------------------------
/**
 * Función para mostrar/ocultar la contraseña en el formulario de registro
 */
function togglePasswordVisibilityRegister() {
    const passwordInput = document.getElementById('pass-create');
    const confirmPasswordInput = document.getElementById('confirmar-pass-create');
    const showPasswordCheckbox = document.getElementById('show-password-create');
    const showConfirmPasswordCheckbox = document.getElementById('show-confirm-password-create');

    if (showPasswordCheckbox && passwordInput) {
        showPasswordCheckbox.addEventListener('change', function () {
            passwordInput.type = this.checked ? "text" : "password";
        });
    }

    if (showConfirmPasswordCheckbox && confirmPasswordInput) {
        showConfirmPasswordCheckbox.addEventListener('change', function () {
            confirmPasswordInput.type = this.checked ? "text" : "password";
        });
    }
}
//---------------------------------------------------------------------
/**
 * Función para manejar el inicio de sesión
 */

function iniciarSesion(event) {
    event.preventDefault();

    const username = document.getElementById("email_username").value.trim();
    const password = document.getElementById("pass-login").value.trim();

    // Obtener la lista de usuarios
    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Buscar el usuario
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        alert("Inicio de sesión exitoso");
        localStorage.setItem("sesionIniciada", JSON.stringify(user)); // Guardar el usuario en sesión
        actualizarInterfaz(); // Actualizar la interfaz
        window.location.href = "index.html"; // Redirigir al inicio
    } else {
        alert("Usuario o contraseña incorrectos");
    }
}
//---------------------------------------------------------------------
/**
 * Función para cerrar sesión
 */

function cerrarSesion() {
    fetch("php/logout.php", { method: "GET", cache: "no-store" })
        .then(() => {
            localStorage.clear(); // Borra cualquier dato guardado en LocalStorage
            alert("Sesión cerrada correctamente.");
            window.location.href = "index.html"; // Redirige a index.html
        })
        .catch(error => console.error("Error al cerrar sesión:", error));
}


//---------------------------------------------------------------------
/**
 * Función para actualizar la interfaz de usuario según el estado de sesión
 */
function actualizarInterfaz() {
    const user = JSON.parse(localStorage.getItem("sesionIniciada"));
    const loginButton = document.getElementById("login-button");
    const logoutButton = document.getElementById("logout-button");
    const uploadButton = document.getElementById("upload-button");
    const registrarButton = document.getElementById("registrar-button");
    const rol1 = document.getElementById("rol1");
    const rol2 = document.getElementById("rol2");
    const rol3 = document.getElementById("rol3");
    const rol4 = document.getElementById("rol4");

    if (user) {
        if (loginButton) loginButton.style.display = "none";
        if (logoutButton) logoutButton.style.display = "block";

        // Mostrar el rol del usuario
        if (user.role === "administrador") {
            if (rol1) rol1.style.display = "block";
            if (rol2) rol2.style.display = "none";
            if (rol3) rol3.style.display = "none";
            if (rol4) rol4.style.display = "none";
            if (uploadButton) uploadButton.style.display = "block";
            if (registrarButton) registrarButton.style.display = "block";
        } else if (user.role === "tutor") {
            if (rol1) rol1.style.display = "none";
            if (rol2) rol2.style.display = "block";
            if (rol3) rol3.style.display = "none";
            if (rol4) rol4.style.display = "none";
            if (uploadButton) uploadButton.style.display = "block";
        } else if (user.role === "estudiante") {
            if (rol1) rol1.style.display = "none";
            if (rol2) rol2.style.display = "none";
            if (rol3) rol3.style.display = "block";
            if (rol4) rol4.style.display = "none";
        }
    } else {
        if (loginButton) loginButton.style.display = "block";
        if (logoutButton) logoutButton.style.display = "none";
        if (uploadButton) uploadButton.style.display = "none";
        if (registrarButton) registrarButton.style.display = "none";
        if (rol1) rol1.style.display = "none";
        if (rol2) rol2.style.display = "none";
        if (rol3) rol3.style.display = "none";
        if (rol4) rol4.style.display = "block";
    }
}
//---------------------------------------------------------------------
/**
 * Función para configurar la carga de archivos.
 */
function setupFileUpload() {
    const fileInput = document.getElementById('file-input');
    if (!fileInput) return; // Evita el error si file-input no existe

    fileInput.addEventListener('change', function(event) {
        const files = Array.from(event.target.files);

        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
                uploadedFiles.push({ name: file.name, data: reader.result });
                localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
                updateFileList();
            };
        });
    });
}
//---------------------------------------------------------------------
// Función para editar un documento
function editDocument(title) {
    let storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    let documentData = storedEntries.find(entry => entry.title === title);

    if (!documentData) {
        alert("Documento no encontrado.");
        return;
    }

    localStorage.setItem("documentToEdit", JSON.stringify(documentData));
    window.location.href = "editar_documento.html";
}
//---------------------------------------------------------------------
// Función para eliminar un documento
function deleteDocument(title) {
    let storedEntries = JSON.parse(localStorage.getItem('entries')) || [];
    let updatedEntries = storedEntries.filter(entry => entry.title !== title);

    if (storedEntries.length === updatedEntries.length) {
        alert("Documento no encontrado.");
        return;
    }

    localStorage.setItem("entries", JSON.stringify(updatedEntries));
    alert("Documento eliminado con éxito.");
    searchDocuments();
}
//---------------------------------------------------------------------
/**
 * Función para buscar documentos en localStorage
 */
function searchDocuments() {
    const searchInput = document.getElementById("search-input").value.toLowerCase();
    const searchResults = document.getElementById("search-results");
    let storedEntries = JSON.parse(localStorage.getItem("entries")) || [];

    const user = JSON.parse(localStorage.getItem("sesionIniciada"));

    const filteredEntries = storedEntries.filter(entry =>
        entry.title.toLowerCase().includes(searchInput) ||
        entry.tags.toLowerCase().includes(searchInput)
    );

    searchResults.innerHTML = filteredEntries.length > 0 ?
        filteredEntries.map(entry => `
            <div class="result-item">
                <h4>${entry.title}</h4>
                <p><strong>Tags:</strong> ${entry.tags}</p>
                <p><strong>Autor(es):</strong> ${entry.authors ? entry.authors.map(a => a.name + ' ' + a.surname).join(', ') : "No especificado"}</p>
                <button onclick="viewDocument('${entry.title}')">Ver</button>
                ${user?.role === "administrador" ? `
                    <button class="edit-button" onclick="editDocument('${entry.title}')">Editar</button>
                    <button class="delete-button" onclick="deleteDocument('${entry.title}')">Eliminar</button>
                ` : ''}
                ${user?.role === "tutor" ? `
                    <button class="edit-button" onclick="editDocument('${entry.title}')">Editar</button>
                ` : ''}
            </div>
        `).join('')
        : "<p>No se encontraron documentos.</p>";
}
//---------------------------------------------------------------------
/**
 * Función para redirigir a la vista del documento seleccionado
 */
function viewDocument(title) {
    window.location.href = `ver_documento.html?title=${encodeURIComponent(title)}`;
}
//---------------------------------------------------------------------
/**
 * Funcionalidad de arrastrar y soltar archivos
 */
const dropArea = document.getElementById('drop-area');

if (dropArea) {
    dropArea.addEventListener('dragover', (event) => {
        event.preventDefault();
        dropArea.style.borderColor = '#007bff';
    });

    dropArea.addEventListener('dragleave', () => {
        dropArea.style.borderColor = '#ccc';
    });

    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.style.borderColor = '#ccc';
        const files = Array.from(event.dataTransfer.files);
        files.forEach(file => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function () {
                let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
                uploadedFiles.push({ name: file.name, data: reader.result });
                localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
                updateFileList();
            };
        });
    });
}
//---------------------------------------------------------------------
/**
 * Actualiza la lista de archivos subidos en la interfaz
 */
function updateFileList() {
    const fileList = document.getElementById('file-list');
    const dropMessage = document.querySelector('#drop-area p');
    const fileInput = document.getElementById('file-input');
    const fileMessage = document.getElementById('file-message');

    let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

    fileList.innerHTML = uploadedFiles.map((file, index) => `
        <li>
            ${file.name}
            <button class="remove-button" onclick="removeFile(${index})">Quitar</button>
        </li>
    `).join('');

    // Ocultar el mensaje de "Arrastra y suelta" si hay archivos
    dropMessage.style.display = uploadedFiles.length > 0 ? 'none' : 'block';

    // Si no hay archivos, mostrar el input file y eliminar el mensaje de archivos subidos
    if (uploadedFiles.length === 0) {
        fileInput.style.display = 'block';
        fileInput.value = ""; // Resetea el input file para permitir subir el mismo archivo
        if (fileMessage) {
            fileMessage.remove();
        }
    }
}
//---------------------------------------------------------------------
/**
 * Elimina un archivo de la lista y lo actualiza en localStorage
 */
function removeFile(index) {
    let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    uploadedFiles.splice(index, 1);
    localStorage.setItem("uploadedFiles", JSON.stringify(uploadedFiles));
    updateFileList();
}
//---------------------------------------------------------------------
/**
 * Descarga un archivo almacenado en localStorage
 */
function downloadFile(index) {
    let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];
    let file = uploadedFiles[index];
    if (file) {
        const a = document.createElement("a");
        a.href = file.data;
        a.download = file.name;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
    }
}
//---------------------------------------------------------------------
/**
 * Busca autores en localStorage y muestra los resultados
 */
function searchAuthors() {
    const searchInput = document.getElementById('search-author-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');
    let storedAuthors = JSON.parse(localStorage.getItem('authors')) || [];

    const filteredAuthors = storedAuthors.filter(author =>
        `${author.name} ${author.surname}`.toLowerCase().includes(searchInput)
    );

    searchResults.innerHTML = filteredAuthors.length > 0 ?
        filteredAuthors.map(author => `<li onclick="selectAuthor('${author.name}', '${author.surname}')">${author.name} ${author.surname}</li>`).join('')
        : `<li>No se encontraron autores</li>`;
}
//---------------------------------------------------------------------
/**
 * Agrega un autor a la lista de autores seleccionados en localStorage
 */
function selectAuthor(name, surname) {
    let selectedAuthors = JSON.parse(localStorage.getItem("selectedAuthors")) || [];
    selectedAuthors.push({ name, surname });
    localStorage.setItem("selectedAuthors", JSON.stringify(selectedAuthors));
    window.location.href = "registrar_documento.html";
}
/***Agregar una nueva categoria a la lista  */
function selectAuthor(name, surname) {
    let selectedAuthors = JSON.parse(localStorage.getItem("selectedAuthors")) || [];
    selectedAuthors.push({ name, surname });
    localStorage.setItem("selectedAuthors", JSON.stringify(selectedAuthors));
    window.location.href = "registrar_documento.html";
}
//---------------------------------------------------------------------
/**
 * Guarda un nuevo autor en localStorage
 */
function addAuthor() {
    const name = document.getElementById('author-name').value.trim();
    const surname = document.getElementById('author-surname').value.trim();
    const ci = document.getElementById('author-ci').value.trim();
    const code = document.getElementById('author-code').value.trim();

    if (name && surname && ci && code) {
        let storedAuthors = JSON.parse(localStorage.getItem('authors')) || [];
        storedAuthors.push({ name, surname, ci, code });
        localStorage.setItem('authors', JSON.stringify(storedAuthors));
        alert("Autor agregado correctamente.");
        window.location.href = 'buscar_autores.html';
    } else {
        alert('Por favor, completa todos los campos.');
    }
}
//---------------------------------------------------------------------
/**
 * Carga los autores seleccionados y los muestra en la lista
 */
function loadSelectedAuthors() {
    const authorResults = document.getElementById("author-results");
    if (!authorResults) return;

    let selectedAuthors = JSON.parse(localStorage.getItem("selectedAuthors")) || [];
    console.log("📌 Cargando autores seleccionados:", selectedAuthors);

    authorResults.innerHTML = selectedAuthors.length > 0 ?
        selectedAuthors.map((author, index) => `
            <li>${author.name} ${author.surname}
                <button onclick="removeSelectedAuthor(${index})">Quitar</button>
            </li>
        `).join('') : "<li>No hay autores seleccionados</li>";
}
//---------------------------------------------------------------------
/**
 * Elimina un autor de la lista de autores seleccionados
 */
function removeSelectedAuthor(index) {
    let selectedAuthors = JSON.parse(localStorage.getItem("selectedAuthors")) || [];
    selectedAuthors.splice(index, 1);
    localStorage.setItem("selectedAuthors", JSON.stringify(selectedAuthors));
    loadSelectedAuthors();
}
//---------------------------------------------------------------------
/**
 * Guarda la información del documento en localStorage
 */
function saveEntry() {
    const tutor = document.getElementById('tutor-input').value.trim();
    const tags = document.getElementById('tags-input').value.trim();
    const title = document.getElementById('title-input').value.trim();
    const subtitle = document.getElementById('subtitle-input').value.trim();
    const categories = document.getElementById('categories-input').value.trim();
    const universidad = document.getElementById('universidad-input').value.trim();
    const facultad = document.getElementById('facultad-input').value.trim();
    const materia = document.getElementById('materia-input').value.trim();

    let selectedAuthors = JSON.parse(localStorage.getItem("selectedAuthors")) || [];
    let uploadedFiles = JSON.parse(localStorage.getItem("uploadedFiles")) || [];

    if (!tutor || !title || !subtitle || !tags || !categories || !universidad || !facultad || !materia || selectedAuthors.length === 0 || uploadedFiles.length === 0) {
        alert('Por favor, completa todos los campos y asegúrate de haber añadido al menos un autor y un archivo.');
        return;
    }

    let entries = JSON.parse(localStorage.getItem("entries")) || [];
    let currentDate = new Date();
    let formattedDate = currentDate.toLocaleDateString('es-ES');

    const newEntry = {
        authors: selectedAuthors,
        tutor,
        tags,
        title,
        subtitle,
        categories,
        universidad,
        facultad,
        materia,
        date: formattedDate,
        files: uploadedFiles
    };

    entries.push(newEntry);
    localStorage.setItem("entries", JSON.stringify(entries));

    localStorage.removeItem("selectedAuthors");
    localStorage.removeItem("uploadedFiles");
    alert('Entrada guardada con éxito.');
    window.location.href = 'index.html'; // Redirige a index.html después de guardar
}
//---------------------------------------------------------------------
/**
 * Función para mostrar los detalles del documento en ver_documento.html
 */
function loadDocumentDetails() {
    const params = new URLSearchParams(window.location.search);
    const title = params.get('title');
    let storedEntries = JSON.parse(localStorage.getItem('entries')) || [];

    const documentData = storedEntries.find(entry => entry.title === title);

    if (!documentData) {
        document.getElementById('document-details').innerHTML = "<p>Documento no encontrado.</p>";
        return;
    }

    document.getElementById('document-details').innerHTML = `
        <h1>${documentData.title}</h1>
        <p><strong>Tutor:</strong> ${documentData.tutor}</p>
        <p><strong>Tags:</strong> ${documentData.tags}</p>
        <p><strong>Autores:</strong> ${documentData.authors.map(a => a.name + ' ' + a.surname).join(', ')}</p>
        <p><strong>Categorías:</strong> ${documentData.categories}</p>
        <p><strong>Universidad:</strong> ${documentData.universidad}</p>
        <p><strong>Facultad:</strong> ${documentData.facultad}</p>
        <p><strong>Materia:</strong> ${documentData.materia}</p>
        <p><strong>Fecha de Guardado:</strong> ${documentData.date}</p>
        <h2>Archivos</h2>
        <ul>
            ${documentData.files.map(file => `<li><a href="${file.data}" download="${file.name}">${file.name}</a></li>`).join('')}
        </ul>
        <button onclick="window.history.back()">Volver</button>
    `;
}
//---------------------------------------------------------------------
/**
 * Función para cargar la edición de un documento.
 */
function loadEditDocument() {
    const documentData = JSON.parse(localStorage.getItem("documentToEdit"));

    if (!documentData) {
        alert("No hay documento para editar");
        window.history.back();
        return;
    }

    document.getElementById("title").value = documentData.title;
    document.getElementById("tags").value = documentData.tags;
    document.getElementById("tutor").value = documentData.tutor;
    document.getElementById("universidad").value = documentData.universidad;
    document.getElementById("facultad").value = documentData.facultad;
    document.getElementById("materia").value = documentData.materia;

    document.getElementById("edit-document-form").addEventListener("submit", function (event) {
        event.preventDefault();

        let storedEntries = JSON.parse(localStorage.getItem("entries")) || [];
        let updatedEntries = storedEntries.map(entry =>
            entry.title === documentData.title ? {
                ...entry,
                title: document.getElementById("title").value.trim(),
                tags: document.getElementById("tags").value.trim(),
                tutor: document.getElementById("tutor").value.trim(),
                universidad: document.getElementById("universidad").value.trim(),
                facultad: document.getElementById("facultad").value.trim(),
                materia: document.getElementById("materia").value.trim()
            } : entry
        );

        localStorage.setItem("entries", JSON.stringify(updatedEntries));
        alert("Documento actualizado con éxito");
        localStorage.removeItem("documentToEdit");
        window.location.href = "index.html"; // Redirige a index.html después de editar
    });
}
//---------------------------------------------------------------------
function goToHome() {
    window.location.href = 'index.html';
    localStorage.removeItem("selectedAuthors");
    localStorage.removeItem("uploadedFiles");
}
function goToHoe() {
    alert('Hasta la Proxima');
    window.location.href = 'index.html';
}

function goToSearchAuthor() {
    window.location.href = 'buscar_autores.html';
}

function goToRegistrarDoc() {
    window.location.href = 'registrar_documento.html';
}