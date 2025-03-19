//importamos las funciones desde el archivo de Model y view
const {readAuthors, writeAuthors,searchAuthor} = require('../models/authorsModel');
const {responseFormatter} = require('../views/responseFormatter');

//funcion para manejar las accionees como mostrar la lista de autores que tenemos, agregar o buscar.
const authorsController = {
    //mostramos la lista de autores
    showAuthors: () => {
        const authors = readAuthors();
        if (!authors || authors.length === 0) {                                  // Si no hay autores o la lista está vacía, retornamos un mensaje de error.
            return responseFormatter({ error: "No authors found" });
        }
        return responseFormatter(authors);                                      // Si existen autores, retornamos la lista formateada.
    },
    
    //agregamos un autor nuevo
    writeAuthors: (newAuthor) => {
        if (!newAuthor.name || !newAuthor.nationality) {                        // Verificamos que los parámetros del autor sean válidos. Si faltan, retornamos un mensaje de error.
            return responseFormatter({ error: "Invalid author data" });
        }
        writeAuthors(newAuthor);                                                //si la info es correcta, se guarda el autor.
        return responseFormatter({newAuthor});                                  // Retornamos el nuevo autor que fue agregado.   
    },

    //Buscamos un autor
    searchAuthor: (searchInfo) => {
        if (!searchInfo){                                                   // Verificamos si no se ha pasado la información de búsqueda.
            return responseFormatter({error: "Invalid authors data"});        // Si no se ha pasado información válida, mostramos un error.
        }
        
        const result = searchAuthor(searchInfo);                              //se llama a la función del modelo para hacer la busqueda
       if (result.error) {                                                  // Si el resultado tiene un error, lo enviamos como respuesta.
           return responseFormatter({error: result.error});                 
       }                                                                          
       return responseFormatter(result);                                     // Si se encontró el autor, retornamos el resultado.
   }
};


//LLAMAMOS A LAS FUNCIONES PARA PROBAR QUE FUNCIONEN---SI FUNCIONAN TODAS
//console.log(authorsController.showAuthors());

//console.log(authorsController.writeAuthors({name: "Sylvia Plath", nationality: "Estadounidense"}));

//console.log(authorsController.searchAuthor("Gabriel García Márquez")); //Debe ingresarse el nombre completo con tildes y mayusculas.
module.exports = {authorsController};