//importamos las funciones desde el archivo de Model y view
const {readAuthors, writeAuthors,searchAuthor} = require('../models/authorsModel');
const {responseFormatter} = require('../views/responseFormatter');

//funcion para manejar las accionees como mostrar la lista de autores que tenemos, agregar o buscar.
const authorsController = {
    //mostramos la lista de autores
    showAuthors: () => {
        const authors = readAuthors();
        if (!authors || authors.length === 0) {  // Si no hay autores o la lista está vacía, retornamos un mensaje de error.
            return responseFormatter({ error: "No authors found" });
        }
        return responseFormatter(authors); // Si existen autores, retornamos la lista formateada.
    },
    
    //agregamos un autor nuevo
    writeAuthors: (newAuthor) => {
        if (!newAuthor.name || !newAuthor.nationality) { // Verificamos que los parámetros del autor sean válidos. Si faltan, retornamos un mensaje de error.
            return responseFormatter({ error: "Invalid author data" });
        }
        writeAuthors(newAuthor);    //si la info es correcta, se guarda el autor.
        return responseFormatter({newAuthor});  // Retornamos el nuevo autor que fue agregado.
    },

    //Buscamos un autor
    searchAuthor: (searchInfo) => {
        const result = searchAuthor(searchInfo); //se llama a la función del modelo para hacer la busqueda.

        console.log("Search result in controller:", result); // Depuración: Imprimimos el resultado de la búsqueda.
   
     if (result.error) {    // Si el resultado tiene error (el autor no se encuentra), lo enviamos como respuesta formateada
        return responseFormatter({ error: result.error });
    }
     // Si se encontró el autor, retornamos el resultado.
    return responseFormatter(result);
    }
};
//authorsController.searchAuthor("Hermann Hesse");    para probar
module.exports = { authorsController };