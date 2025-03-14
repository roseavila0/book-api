
//Importo los modulos que necesito (fs - para la modificación de archivos y path para trabajar con rutas de archivos).
const fs = require ('fs');
const path = require('path');

//Importo la versión del generador de identififcador único (uuidv4), 
/*RECORDAR:
Este UUIDv4 se genera de forma completamente aleatoria. Es la versión más comúnmente usada para identificadores únicos porque no depende de la hora, el espacio de nombres, o
cualquier otro valor. Simplemente se genera un UUID que es prácticamente único graciasa la aleatoriedad.*/
const {v4: uuidv4} = require ('uuid');


//uso path.join para definir la ruta completa del archivo json donde almacenare los datos de los autores.
//__dirname nos ayuda a representar el directorio actual del archivo y asi puedo construir la ruta relativa desde aqui.
const dataPath = path.join(__dirname, '../data/books.json');


    //leemos los libros
    const readBooks= () => {
          // Si el archivo no existe, creamos un archivo vacío con un arreglo
        if (!fs.existsSync(dataPath)){
        fs.writeFileSync(dataPath, '[]');
        }
        const data = fs.readFileSync(dataPath, 'utf-8'); //usamos 'utf-8' porque ayudar a convertir la info que viene siendo buffer y nos la da en formato string, osea la vuelve legible.
        return JSON.parse(data); // la información en formato json se retorna en javascript pero la convertimos usando JSON.parse 
    };


    //función para agregar libros nuevos. 
    const writeBooks= (book) => {
        const books = readBooks(); //leo la lista actual de los libros ya registrados

        const newBook = {
            id: uuidv4(),   //uso uuidv4 para generar un identificador único
            name: book.name,
            author: book.author
        };

        books.push(newBook);  //agregamos el nuevo libro a la lista del json (conviertiendo con JSON.stringify a formato json)
        fs.writeFileSync(dataPath,JSON.stringify(books, null,2));  //el null ayuda a que no haya cambios o reemplazos y el 2 ayuda con los espacios en el formato json.
        console.log("New book added.");
    };

     const searchBook = (searchInfo) => {
            const books = readBooks(); //leemos los libros
            const result = books.find(book => 
                book.name.toLowerCase() === searchInfo.toLowerCase()||
                book.nationality.toLowerCase() === searchInfo.toLowerCase()
            )
            return result || { error: "Book not found" }; 
    };
    

    

module.exports = {readBooks, writeBooks, searchBook}