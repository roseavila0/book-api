//importamos las funciones desde el archivo de Model y view
const {readBooks, writeBooks ,searchBook} = require('../models/booksModel');
const {responseFormatter} = require('../views/responseFormatter');

//funcion para manejar las accionees como mostrar la lista de libros que tenemos, agregar o buscar.
const booksController = {
    //mostramos la lista de libros
    showBooks: () => {
        const books = readBooks();
        if (!books || books.length === 0) {   // Si no hay libros o la lista está vacía, retornamos un mensaje de error.
            return responseFormatter({error: "No book found"});
        }
        return responseFormatter(books);  // Si existen libros, retornamos la lista formateada.
    },
    
    //agregamos un libro nuevo
    writeBooks: (newBook) => {
        if (!newBook.name || !newBook.author) { // Verificamos que los parámetros del libro sean válidos. Si faltan, retornamos un mensaje de error.
            return responseFormatter({error: "Invalid book data"});
        }
        writeBooks(newBook);     //si la info es correcta, se guarda el libro.
        return responseFormatter({newBook});   // Retornamos el nuevo libro que fue agregado.
    },

    searchBook: (searchInfo) => {
        const result = searchBook(searchInfo); //se llama a la función del modelo
        // Si el resultado tiene error(el libro no se encuentra), lo enviamos como respuesta formateada
        if (result.error) {
           return responseFormatter({error: result.error});
       } 
       // Si se encontró el libro, retornamos el resultado.
       return responseFormatter(result);
   }
};

module.exports = { booksController };