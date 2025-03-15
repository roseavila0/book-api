/*3. Manejo de Datos con JSON -----Objetivo: Crear y gestionar archivos JSON para libros, autores y editoriales.
Instrucciones:
a) En la carpeta data, crea tres archivos JSON: • books.json • authors.json • publishers.json.
a) Los archivos deben contener datos iniciales para libros, autores y editoriales, respectivamente.
b) Implementa en los MODELOS la lógica para leer y escribir datos desde y hacia estos archivos usando el módulo FS.*/

//Importo los modulos que necesito (fs - para la modificación de archivos y path para trabajar con rutas de archivos).
const fs = require ('fs');
const path = require('path');

//Importo la versión del identififcador único (uuidv4), 
/*RECORDAR:
Este UUIDv4 se genera de forma completamente aleatoria. Es la versión más comúnmente usada para identificadores únicos porque no depende de la hora, el espacio de nombres, o
cualquier otro valor. Simplemente se genera un UUID que es prácticamente único graciasa la aleatoriedad.*/
const {v4: uuidv4} = require ('uuid');


//uso path.join para definir la ruta completa del archivo json donde almacenare los datos de los autores.
//__dirname nos ayuda a representar el directorio actual del archivos y asi puedo construir la ruta relativa desde aqui.
const dataPath = path.join(__dirname, '../data/authors.json');


    //leemos los autores
    const readAuthors= () => {
         // Si el archivo no existe, creamos un archivo vacío con un arreglo
        if (!fs.existsSync(dataPath)){
        fs.writeFileSync(dataPath, '[]');
      }
        const data = fs.readFileSync(dataPath, 'utf-8'); 
        return JSON.parse(data); // la información en formato json se retorna en javascript pero la convertimos usando JSON.parse 

    };


    //función para agregar autores nuevos. 
    const writeAuthors= (author) => {
        const authors = readAuthors(); //leo la lista actual de los autores ya registrados

        const newAuthor = {
            id: uuidv4(),   //uso uuidv4 para generar un identificador único
            name: author.name,
            nationality: author.nationality  
        };

        authors.push(newAuthor);  //agregamos el nuevo autor a la lista del json (conviertiend con JSON.stringify a formato json)
        fs.writeFileSync(dataPath,JSON.stringify(authors, null,2));   //el null ayuda a que no haya cambios o reemplazos y el 2 ayuda con los espacios en el formato json.
        console.log("New author added.");
    };

    const searchAuthor = (searchInfo) => {
        const authors = readAuthors(); //leemos los autores
        const result = authors.find(author => 
            author.name.toLowerCase() === searchInfo.toLowerCase()||
            author.nationality.toLowerCase() === searchInfo.toLowerCase()
        )
        return result || { error: "Author not found" }; 
    };

module.exports = {readAuthors, writeAuthors,searchAuthor}