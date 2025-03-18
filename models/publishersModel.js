//PUBLISHERS significa 'Editoriales'.
//3.b) Implementa en los MODELOS la lógica para leer y escribir datos desde y hacia estos archivos usando el módulo FS.*/
//Importo los modulos que necesito.
const fs = require ('fs');
const path = require('path');

//Importo la versión del generador de identififcador único (uuidv4), 
/*RECORDAR: Este UUIDv4 se genera de forma completamente aleatoria. Es la versión más comúnmente usada para identificadores únicos porque no depende de la hora, el espacio de nombres, o cualquier otro valor. Simplemente se genera un UUID que es prácticamente único graciasa la aleatoriedad.*/
const {v4: uuidv4} = require ('uuid');

//uso path.join para definir la ruta completa del archivo json donde almacenare los datos de los autores.
//__dirname nos ayuda a representar el directorio actual del archivo y asi puedo construir la ruta relativa desde aqui.
const dataPath = path.join(__dirname, '../data/publishers.json');


    //Función para leer la lista de editoriales
    const readPublishers= () => {
        if (!fs.existsSync(dataPath)){                                                          // Si el archivo no existe, creamos un archivo vacío con un arreglo
        fs.writeFileSync(dataPath, '[]');
        }
        const data = fs.readFileSync(dataPath, 'utf-8');                                        //se lee la lista de los autores que estan en la ruta del archio json. //usamos 'utf-8' porque ayudar a convertir la info que viene siendo buffer y nos la da en formato string, osea la vuelve legible.
        return JSON.parse(data);                                                                // da la información en formato json pero la convertimos a javascrip usando JSON.parse 
    };


    //función para agregar Editoiales nuevas. 
    const writePublishers= (publisher) => {
        const publishers = readPublishers();                                                     //leo la lista actual de las editoriales ya registradas.

        const newPublisher = {
            id: uuidv4(),                                                                       //uso uuidv4 para generar un identificador único
            name: publisher.name,
            country: publisher.country
        };

        publishers.push(newPublisher);                                                           //agregamos la nueva editorial a la lista del json (conviertiendo con JSON.stringify a formato json)
        fs.writeFileSync(dataPath,JSON.stringify(publishers, null,2));                          //el null ayuda a que no haya cambios o reemplazos y el 2 ayuda con los espacios en el formato json.
        console.log("New publisher added.");
    };

    //función para buscar una editorial
    const searchPublisher = (searchInfo) => {
        const publishers = readPublishers();                                                    //leemos la lista de editoriales desde el archivo json
        const result = publishers.find(publisher =>                                             //buscamos en el arreglo de editoriales una editorial cuyo nombre sea igual a la que ingresamos para buscar.
        publisher.name.toLowerCase().trim() === searchInfo.toLowerCase().trim());
            return result || { error: "Publisher not found" };                                   // nos da el resultado de la busqueda si es que esta correcto todo o si hay errs nos muestra un msj de error.
    };
        
module.exports = {readPublishers, writePublishers, searchPublisher}