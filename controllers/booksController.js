//importamos las funciones desde el archivo de Model y view
const {readBooks, writeBooks ,searchBook} = require('../models/booksModel');
const {responseFormatter} = require('../views/responseFormatter');

//funcion para manejar las accionees como mostrar la lista de libros que tenemos, agregar o buscar.
const booksController = {
    //mostramos la lista de libros
    showBooks: () => {
        const books = readBooks();
        if (!books || books.length === 0) {                                   // Si no hay libros o la lista está vacía, retornamos un mensaje de error.
            return responseFormatter({error: "No book found"});
        }
        return responseFormatter(books);                                     // Si existen libros, retornamos la lista formateada.
    },
    
    //agregamos un libro nuevo
    writeBooks: (newBook) => {
        if (!newBook.name || !newBook.author) {                             // Verificamos que los parámetros del libro sean válidos. Si faltan, retornamos un mensaje de error.
            return responseFormatter({error: "Invalid book data"});
        }
        writeBooks(newBook);                                                //si la info es correcta, se guarda el libro.
        return responseFormatter({newBook});                                 // Retornamos el nuevo libro que fue agregado.
    }, 

    searchBook: (searchInfo) => {  
        if (!searchInfo){                                                   // Verificamos si no se ha pasado la información de búsqueda.
            return responseFormatter({error: "Invalid book data"});        // Si no se ha pasado información válida, mostramos un error.
        }
        
        const result = searchBook(searchInfo);                              //se llama a la función del modelo para hacer la busqueda
       if (result.error) {                                                  // Si el resultado tiene un error, lo enviamos como respuesta.
           return responseFormatter({error: result.error});                 
       }                                                                          
       return responseFormatter(result);                                     // Si se encontró el libro, retornamos el resultado.
   }
};


//LLAMAMOS A LAS FUNCIONES PARA PROBAR QUE FUNCIONEN---SI FUNCIONAN TODAS
//console.log(booksController.showBooks());

//console.log(booksController.writeBooks({name: "Rayuela", author: "Julio Cortázar"}));

//console.log(booksController.searchBook("La sombra del viento")); //Debe ingresarse el nombre completo con tildes y mayusculas.    

module.exports = { booksController };