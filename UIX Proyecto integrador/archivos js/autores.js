let authors = [];

document.addEventListener('DOMContentLoaded', () => {
    const addAuthorBtn = document.getElementById('add-author-btn');
    const cancelBtn = document.getElementById('cancel-btn');

    if (addAuthorBtn) {
        addAuthorBtn.addEventListener('click', addAuthor);
    }

    if (cancelBtn) {
        cancelBtn.addEventListener('click', () => {
            window.location.href = 'buscar_autores.html';
        });
    }

    const searchAuthorBtn = document.querySelector('#search-author-input + button');
    if (searchAuthorBtn) {
        searchAuthorBtn.addEventListener('click', searchAuthors);
    }
});

function updateAuthorResults() {
    const authorResults = document.getElementById('author-results');
    authorResults.innerHTML = selectedAuthors.map((author, index) => `
        <li>
            ${author.name} ${author.surname}
            <button class="remove-button" onclick="removeAuthor(${index})">Quitar</button>
        </li>
    `).join('');
}

function searchAuthors() {
    const searchInput = document.getElementById('search-author-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');

    const filteredAuthors = authors.filter(author =>
        `${author.name} ${author.surname}`.toLowerCase().includes(searchInput)
    );

    searchResults.innerHTML = filteredAuthors.map(author => `
        <li onclick="selectAuthor('${author.name}', '${author.surname}')">
             ${author.name} ${author.surname}
        </li>
    `).join('');
}

function selectAuthor(name, surname) {
    selectedAuthors.push({ name, surname });
    updateAuthorResults();
    window.location.href = 'registrar_documento.html';
}

function addAuthor() {
    const name = document.getElementById('author-name').value;
    const surname = document.getElementById('author-surname').value;
    const ci = document.getElementById('author-ci').value;
    const code = document.getElementById('author-code').value;

    if (name && surname && ci && code) {
        authors.push({ name, surname, ci, code });
        document.getElementById('author-name').value = '';
        document.getElementById('author-surname').value = '';
        document.getElementById('author-ci').value = '';
        document.getElementById('author-code').value = '';
        alert('Autor añadido con éxito.');
        window.location.href = 'buscar_autores.html';
    } else {
        alert('Por favor, completa todos los campos.');
    }
}
