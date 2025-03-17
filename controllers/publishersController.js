//importamos las funciones desde el archivo de Model y view
const {readPublishers, writePublishers, searchPublisher} = require('../models/publishersModel');
const {responseFormatter} = require('../views/responseFormatter');

//funcion para manejar las accionees como mostrar la lista de Editoriales que tenemos, agregar o buscar.
const publishersController = {
    //mostramos la lista de editoriales
    showPublishers: () => {
        const publishers = readPublishers();
        if (!publishers || publishers.length === 0) {  // Si no hay editoriales o la lista está vacía, retornamos un mensaje de error.
            return responseFormatter({error: "No publisher found"});
        }
        return responseFormatter(publishers);  // Si existen editorials, retornamos la lista formateada.
    },
    
    //agregamos un autor nuevo
    writePublishers: (newPublisher) => {
        if (!newPublisher.name || !newPublisher.country) {  // Verificamos que los parámetros de la editorial sean válidos. Si faltan, retornamos un mensaje de error.
            return responseFormatter({error: "Invalid publisher data"});
        }
        writePublishers(newPublisher); //si la info es correcta, se guarda la editorial.
        return responseFormatter({newPublisher});  // Retornamos la nueva editorial que fue agregada.
    },

    //Buscamos una editorial
    searchPublisher: (searchInfo) => {
        const result = searchPublisher(searchInfo);  //se llama a la función del modelo para hacer la busqueda.
        if (result.error) {      // Si el resultado tiene error (la editorial no se encuentra), lo enviamos como respuesta formateada
            return responseFormatter({error: result.error});
        }
       // Si se encontró el autor, retornamos el resultado.
        return responseFormatter(result);
    }
};

module.exports = { publishersController };