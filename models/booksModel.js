
//3.b) Implementa en los MODELOS la lógica para leer y escribir datos desde y hacia estos archivos usando el módulo FS.*/
//Importo los modulos que necesito.
const fs = require ('fs'); //(fs - para la modificación de archivos
const path = require('path'); // path para trabajar con rutas de archivos)

//Importo la versión del generador de identififcador único (uuidv4), 
/*RECORDAR:Este UUIDv4 se genera de forma completamente aleatoria. Es la versión más comúnmente usada para identificadores únicos porque no depende de la hora, el espacio de nombres, o cualquier otro valor. Simplemente se genera un UUID que es prácticamente único graciasa la aleatoriedad.*/
const {v4: uuidv4} = require ('uuid');

//uso path.join para definir la ruta completa del archivo json donde almacenare los datos de los autores.
//__dirname nos ayuda a representar el directorio actual del archivo y asi puedo construir la ruta relativa desde aqui.
const dataPath = path.join(__dirname, '../data/books.json');


    //  //Función para leer los libros
    const readBooks= () => {
        if (!fs.existsSync(dataPath)){                                            // Si el archivo no existe, creamos un archivo vacío con un arreglo
        fs.writeFileSync(dataPath, '[]');
        }
        const data = fs.readFileSync(dataPath, 'utf-8');                           //usamos 'utf-8' porque ayudar a convertir la info que viene siendo buffer y nos la da en formato string, osea la vuelve legible.
        return JSON.parse(data);                                                   // nos da la info en formato json pero la convertimos usando JSON.parse en formato javascript
    };


    //función para agregar libros nuevos. 
    const writeBooks= (book) => {
        const books = readBooks();                                                //se lee la lista actual de los libros ya registrados en el archivo json

        const newBook = {
            id: uuidv4(),                                                           //uso uuidv4 para generar un identificador único
            name: book.name,
            author: book.author
        };

        books.push(newBook);                                                        //agregamos el nuevo libro a la lista del json (convertimos con JSON.stringify a formato json)
        fs.writeFileSync(dataPath,JSON.stringify(books, null,2));                   //el null ayuda a que no haya cambios o reemplazos y el 2 ayuda con los espacios en el formato json.
        console.log("New book added.");
    };

    //función para buscar un libro
     const searchBook = (searchInfo) => {
            const books = readBooks();                                              //leemos los libros desde el archivo json.
            const result = books.find(book =>                                       //buscamos en el arreglo de libros un libro cuyo nombre sea igual a la que ingresamos para buscar.
                book.name.toLowerCase().trim() === searchInfo.toLowerCase().trim());

            return result || { error: "Book not found" };                            // nos da el resultado de la busqueda si es que esta correcto todo o si hay errs nos muestra un msj de error.
    };
    

    

module.exports = {readBooks,writeBooks,searchBook}