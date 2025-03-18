//importamos las funciones desde el archivo de Model y view
const {readPublishers, writePublishers, searchPublisher} = require('../models/publishersModel');
const {responseFormatter} = require('../views/responseFormatter');

//funcion para manejar las accionees como mostrar la lista de Editoriales que tenemos, agregar o buscar.
const publishersController = {
    //mostramos la lista de editoriales
    showPublishers: () => {
        const publishers = readPublishers();
        if (!publishers || publishers.length === 0) {                                   // Si no hay editoriales o la lista está vacía, retornamos un mensaje de error.
            return responseFormatter({error: "No publisher found"});
        }
        return responseFormatter(publishers);                                          // Si existen editorials, retornamos la lista formateada.
    },
    
    //agregamos una editorial nueva
    writePublishers: (newPublisher) => {
        if (!newPublisher.name || !newPublisher.country) {                              // Verificamos que los parámetros de la editorial sean válidos. Si faltan, retornamos un mensaje de error.
            return responseFormatter({error: "Invalid publisher data"});
        }
        writePublishers(newPublisher);                                                  //si la info es correcta, se guarda la editorial.
        return responseFormatter({newPublisher});                                        // Retornamos la nueva editorial que fue agregada.
    },

    //Buscamos una editorial
    searchPublisher: (searchInfo) => {
        if (!searchInfo){                                                   // Verificamos si no se ha pasado la información de búsqueda.
            return responseFormatter({error: "Invalid publisher data"});        // Si no se ha pasado información válida, mostramos un error.
        }
        
        const result = searchPublisher(searchInfo);                              //se llama a la función del modelo para hacer la busqueda
       if (result.error) {                                                  // Si el resultado tiene un error, lo enviamos como respuesta.
           return responseFormatter({error: result.error});                 
       }                                                                          
       return responseFormatter(result);                                     // Si se encontró la editorial, retornamos el resultado.
   }
};


//LLAMAMOS A LAS FUNCIONES PARA PROBAR QUE FUNCIONEN---SI FUNCIONAN TODAS
//console.log(publishersController.showPublishers());

//console.log(publishersController.writePublishers({name: "El conejo", country: "Ecuador"}));

//console.log(publishersController.searchPublisher("Alianza Editorial")); //Debe ingresarse el nombre completo con tildes y mayusculas.
module.exports = { publishersController };