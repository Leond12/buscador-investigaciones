async function guardarDoc() {
    const tutor = document.getElementById('tutor-input').value.trim();
    const title = document.getElementById('title-input').value.trim();
    const subtitle = document.getElementById('subtitle-input').value.trim();
    const descripcion = document.getElementById('descripcion-input').value.trim();
    const universidad = document.getElementById('universidad-input').value.trim();
    const facultad = document.getElementById('facultad-input').value.trim();
    const materia = document.getElementById('materia-input').value.trim();
    const fileInput = document.getElementById('file-input'); // Campo de archivo
    const file = fileInput.files[0]; // Obtener el primer archivo seleccionado

    // Obtener el ID del usuario desde localStorage
    let id_usuario = localStorage.getItem("id_usuario");
    // Obtener el ID de categtoria desde localStorage
    let id_categoria = localStorage.getItem("selectedCategory");
     // Obtener la lista de autores desde localStorage
    let selectedAuthors = JSON.parse(localStorage.getItem("selectedAuthors")) || [];

    if (!tutor || !title || !subtitle || !descripcion || !universidad || !facultad || !materia || selectedAuthors.length === 0) {
        alert('Por favor, completa todos los campos y asegúrate de haber añadido al menos un autor.');
        return;
    }

    let formData = new FormData();
    formData.append("usuario_id", id_usuario);
    formData.append("categoria_id", id_categoria);

    formData.append("titulo", title);
    formData.append("titulo_largo", subtitle);
    formData.append("descripcion", descripcion);
    formData.append("universidad", universidad);
    formData.append("facultad", facultad);
    formData.append("materia", materia);
    formData.append("tutor", tutor);
    formData.append("autores", JSON.stringify(selectedAuthors)); // Enviar autores como JSON
    formData.append("tags", JSON.stringify(selectedTags)); // Enviar tags como JSON
    formData.append("archivo", file); // Agregar el archivo

    try {
        let response = await fetch("PHP/registrar_documento.php", {
            method: "POST",
            body: formData
        });

        let result = await response.text(); // Se espera una respuesta del servidor
        alert(result); // Mostrar respuesta del backend
        if (response.ok) {
            localStorage.removeItem("selectedAuthors");
            localStorage.removeItem("uploadedFiles");

            window.location.href = 'index.html'; // Redirigir si se guarda con éxito
        }
    } catch (error) {
        console.error("Error al enviar datos:", error);
        alert("Hubo un error al guardar el documento.");
    }
}