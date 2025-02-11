let selectedAuthors = [];
let uploadedFiles = [];

document.getElementById('file-input').addEventListener('change', function(event) {
    const files = Array.from(event.target.files);
    uploadedFiles.push(...files);
    updateFileList();
});

// Funcionalidad de arrastrar y soltar archivos
const dropArea = document.getElementById('drop-area');

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
    uploadedFiles.push(...files);
    updateFileList();
});

function updateFileList() {
    const fileList = document.getElementById('file-list');
    fileList.innerHTML = uploadedFiles.map((file, index) => `
        <li>
            ${file.name}
            <button class="remove-button" onclick="removeFile(${index})">Quitar</button>
        </li>
    `).join('');
}

function removeFile(index) {
    uploadedFiles.splice(index, 1);
    updateFileList();
}

function updateAuthorResults() {
    const authorResults = document.getElementById('author-results');
    authorResults.innerHTML = selectedAuthors.map((author, index) => `
        <li>
            ${author.name} ${author.surname}
            <button class="remove-button" onclick="removeAuthor(${index})">Quitar</button>
        </li>
    `).join('');
}

function removeAuthor(index) {
    selectedAuthors.splice(index, 1);
    updateAuthorResults();
}

function saveEntry() {
    const tags = document.getElementById('tags-input').value.trim();
    const title = document.getElementById('title-input').value.trim();
    const subtitle = document.getElementById('subtitle-input').value.trim();
    const categories = document.getElementById('categories-input').value.trim();
    const date = document.getElementById('date-input').value;

    if (!title || !subtitle || !tags || !categories || !date || selectedAuthors.length === 0 || uploadedFiles.length === 0) {
        alert('Por favor, completa todos los campos y asegúrate de haber añadido al menos un autor y un archivo.');
        return;
    }

    alert('Entrada guardada con éxito.');
    clearTituloxFields();
}

function clearTituloxFields() {
    document.getElementById('tags-input').value = '';
    document.getElementById('title-input').value = '';
    document.getElementById('subtitle-input').value = '';
    document.getElementById('categories-input').value = '';
    document.getElementById('date-input').value = '';
    selectedAuthors = [];
    uploadedFiles = [];
    updateAuthorResults();
    updateFileList();
}

function goToHome() {
    window.location.href = 'index.html';
}

function goToSearchAuthor() {
    window.location.href = 'buscar_autores.html';
} 
