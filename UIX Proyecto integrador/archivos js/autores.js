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

function addAuthor() {
    const name = document.getElementById('author-name').value;
    const surname = document.getElementById('author-surname').value;
    const ci = document.getElementById('author-ci').value;
    const code = document.getElementById('author-code').value;

    if (name && surname && ci && code) {
        authors.push({ name, surname, ci, code });
        alert('Autor añadido con éxito.');
        window.location.href = 'buscar_autores.html';
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function searchAuthors() {
    const searchInput = document.getElementById('search-author-input').value.toLowerCase();
    const searchResults = document.getElementById('search-results');

    const filteredAuthors = authors.filter(author =>
        `${author.name} ${author.surname}`.toLowerCase().includes(searchInput)
    );

    searchResults.innerHTML = filteredAuthors.map(author => `
        <li>
            ${author.name} ${author.surname}
        </li>
    `).join('');
}
