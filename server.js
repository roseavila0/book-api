
//Importo el modulo net para crear servidores TCP y las rutas de los archivos de la carpeta de controller. Tambien declare la variable puerto con el numero de puerto 8080
const net =  require ('net');
const {authorsController} = require ('./controllers/authorsController');
const {booksController} = require ('./controllers/booksController')
const {publishersController} = require ('./controllers/publishersController');
const port = 8080;

//creo el servidor
const server = net.createServer ((socket) => {
    console.log("Client connected");
 
    socket.on('data', (data) => {
        const message = data.toString().trim();
        console.log("Data received: ", message);

    
        // Dividir el mensaje en partes usando una expresión regular  (/\"([^"]+)\"/g)  para encontrar, capturar argumentos entre comillas ----Devuelve un array con los valores que encontró, incluyendo las comillas.
        //const args = message.match(/(?:[^"]\S*|"[^"]*")+/g);
        //console.log('Args:', args);  // Verificar los argumentos recibidos

        //const args = message.split(/\s+/);  // Dividir por espacios
        const args = message.match(/(?:[^\s"]+|"[^"]*")+/g);
        console.log("Search command:", message);
        console.log('Args:', args);  // Verificar los argumentos

        if (!args || args.length < 2) {
            socket.write("Invalid command format\n");
            return;
        }

        const command = args[0].toUpperCase();   //tranforma a Mayuscula los comandos y 
        const category = args[1].toLowerCase();       //en minuscula las categorias.

        switch (command) {
            case "GET": // Si el comando es GET
                switch (category) {
                    case "authors":
                        const authors = JSON.parse(authorsController.showAuthors());
                        socket.write(`Authors: ${JSON.stringify(authors, null, 2)}\n`);
                        break;
                    case "books":
                        const books = JSON.parse(booksController.showBooks());
                        socket.write(`Books: ${JSON.stringify(books, null, 2)}\n`);
                        break;
                    case "publishers":
                        const publishers = JSON.parse(publishersController.showPublishers());
                        socket.write(`Publishers: ${JSON.stringify(publishers, null, 2)}\n`);
                        break;
                    default:
                        socket.write("Unrecognized category\n");
                }
                break;

            case "ADD": // Si el comando es ADD
                if (args.length < 4) {
                    socket.write("Invalid ADD command. Please use: ADD \"category\" \"name\" \"info\" \n");
                    return;
                }

                // Se eliminan las comillas con .replace(/\"/g, "") para obtener el texto real.
                const name = args[2].replace(/"/g, "").trim();    //RECUERDAAAAAAAAAAAAAAAAAAA .trim() Asegura que no haya espacios extra al inicio o final.
                const additionalInfo = args[3].replace(/"/g, "").trim();

                switch (category) {
                    case "authors":
                        const nationality = additionalInfo;
                        const newAuthor = authorsController.writeAuthors({ name, nationality });
                        socket.write(`Author added: ${JSON.stringify(newAuthor)}\n`);
                        break;

                    case "books":
                        const author = additionalInfo;
                        const newBook = booksController.writeBooks({ name, author });
                        socket.write(`Book added: ${JSON.stringify(newBook)}\n`);
                        break;

                    case "publishers":
                        const country = additionalInfo;
                        const newPublisher = publishersController.writePublishers({ name, country });
                        socket.write(`Publisher added: ${JSON.stringify(newPublisher)}\n`);
                        break;

                    default:
                        socket.write("Unrecognized category\n");
                }
                break;

            case "SEARCH": // Si el comando es SEARCH
            //console.log("Processing SEARCH command for category:", category); //PARA DEPURAR****
                 if (args.length < 3) {  // Se necesita al menos un criterio de búsqueda
                    socket.write("Invalid SEARCH command. Please use: SEARCH \"category\" \"search info\"\n");
                    return;
                }
        
                const searchInfo = args[2].replace(/"/g, "").trim(); // Eliminar comillas y espacios extra
                //console.log("Processing SEARCH command for category:", category);
                //console.log("Search Info: ", searchInfo); // Ver qué se está pasando al buscar //PARA DEPURAR****
                
                switch (category) {
                    case "authors":
                        /*const authorsResult = authorsController.searchAuthor(searchInfo);
                        console.log("Authors Result:", authorsResult);  // Imprime el resultado de búsqueda //PARA DEPURAR****
                        socket.write(`Search result: ${JSON.stringify(authorsResult, null, 2)}\n`); */
                        const authorsResult = authorsController.searchAuthor(searchInfo) || { error: "Author not found" };
                        socket.write(JSON.stringify(authorsResult) + "\n");
                        break;
                    case "books":
                        const booksResult = booksController.searchBook(searchInfo);
                        socket.write(`Search result: ${JSON.stringify(booksResult, null, 2)}\n`);
                        break;
                    case "publishers":
                        const publisherResult = publishersController.searchPublisher(searchInfo);
                        socket.write(`Search result: ${JSON.stringify(publisherResult, null, 2)}\n`);
                        break;
                    default:
                        socket.write("Unrecognized category\n");
                }
                break;

                case "EXIT":
                console.log("Client requested to exit");
                socket.write("Goodbye!\n");
                socket.end();  // Cierra la conexión de forma ordenada
                
                break;

            default:
                socket.write("Unrecognized command\n");
                break;
        }
    });

    socket.on('end', () =>{
        console.log("\nThe client has disconnected.");
    })

    socket.on('close', () => {
        console.log("\nThe connection has been closed.");
    });

    socket.on('error', (err) =>{
        console.log("Error:", err.message);
    })

});


//escuchamos en el puerto 8080
server.listen(port, () =>{
    console.log("The server is listening on port", port);
});