<?php
$servername = "localhost";
$username = "root"; // Ajusta según tu configuración
$password = "";
$database = "gestion_documentos"; // Cambia por el nombre de tu base de datos

$conn = new mysqli($servername, $username, $password, $database);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}
try {
    // Verificar si el archivo fue subido
    if (!isset($_FILES["archivo"])) {
        throw new Exception("No se ha seleccionado ningún archivo.");
    }

    $archivo = $_FILES["archivo"];
    $nombreArchivo = $archivo["name"];
    $tamanoArchivo = $archivo["size"]; // Tamaño en bytes
    $tipoArchivo = strtolower(pathinfo($nombreArchivo, PATHINFO_EXTENSION)); // Extensión del archivo
    $rutaDestino = "../documentos/" . basename($nombreArchivo);

    // Extensiones permitidas
    $extensionesPermitidas = ["doc", "docx", "pdf", "txt"];
    $tipoArchivo = strtolower(pathinfo($nombreArchivo, PATHINFO_EXTENSION));
    
    if (!in_array($tipoArchivo, $extensionesPermitidas)) {
        throw new Exception("Extensión no permitida. Solo se aceptan archivos .doc, .docx, .pdf, .txt");
    }

    // Mover el archivo al servidor
    if (!move_uploaded_file($archivo["tmp_name"], $rutaDestino)) {
        throw new Exception("Error al subir el archivo.");
    }

    // Obtener los datos del formulario
    $usuario_id = $conn->real_escape_string($_POST["usuario_id"] ?? "");
    $categoria_id = $conn->real_escape_string($_POST["categoria_id"] ?? "");
    
    $titulo = $conn->real_escape_string($_POST["titulo"] ?? "");
    $titulo_largo = $conn->real_escape_string($_POST["titulo_largo"] ?? "");
    $descripcion = $conn->real_escape_string($_POST["descripcion"] ?? "");
    $universidad = $conn->real_escape_string($_POST["universidad"] ?? "");
    $facultad = $conn->real_escape_string($_POST["facultad"] ?? "");
    $materia = $conn->real_escape_string($_POST["materia"] ?? "");
    $tutor = $conn->real_escape_string($_POST["tutor"] ?? "");
    $autores = json_decode($_POST["autores"], true); // Decodificar JSON de autores
    $tags = json_decode($_POST["tags"], true); // Decodificar JSON de tags
    // Insertar en la base de datos (fecha con NOW())
   
    $sql = "INSERT INTO Documento (id_usuario, titulo, titulo_largo, nombre_archivo, universidad, facultad, materia, tutor, fecha_subida, descripcion, ruta, tamano_archivo, tipo_archivo, nro_vistas) 
            VALUES ('$usuario_id', '$titulo', '$titulo_largo', '$nombreArchivo', '$universidad', '$facultad', '$materia', '$tutor', NOW(), '$descripcion', '$rutaDestino', $tamanoArchivo, '$tipoArchivo', 0)";

    if (!$conn->query($sql)) {
        throw new Exception("Error al guardar en la base de datos: " . $conn->error);
    }

    // Obtener el ID del documento recién insertado
    $documento_id = $conn->insert_id;

    //asociar la categoria con el documento en la tabla Documento_Categoria
    $conn->query("INSERT INTO Documento_Categoria (id_Documento, id_Categoria) VALUES ($documento_id, $categoria_id)");

    // asociamos los autores con el documento en la tabla `Documento_Autor`
    foreach ($autores as $autor) {
        //obtenemos del json los datos id
        $autor_id = $conn->real_escape_string($autor["id"]);

        // insertar asociando el autor con el documento en tabla `Documento_Autor`
        $conn->query("INSERT INTO Documento_Autores (id_documento, id_Autores) VALUES ($documento_id, $autor_id)");
    }

    // asociamos los tags con el documento en la tabla `Documento_Tag`
    foreach ($tags as $tag) {
        //obtenemos del json los datos id
        $tag_id = $conn->real_escape_string($tag["id"]);

        // insertar asociando el autor con el documento en tabla `Documento_Autor`
        $conn->query("INSERT INTO Documento_Tag (id_documento, id_tag) VALUES ($documento_id, $tag_id)");
    }


    //si todo salio bien devolvemos un texto ok
    echo "Documento subido exitosamente";

} catch (Exception $e) {
    echo "" . $e->getMessage() . "";
} finally {
    $conn->close();
}

?>