
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

            
        // Dividimos el mensaje en partes (Ejemplo: "GET authors" o "ADD books Nombre Autor")
        const parts = message.split(' '); 
        const command = parts[0]; //// Aquí guardamos el primer dato, que puede ser GET o ADD
        const category = parts[1]; //// Aquí guardamos el segundo dato, que será "authors", "books" o "publishers"

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
                        socket.write("Unrecognized category\n"); // Si no es alguna categoria de las que dejamos indicadas: authors, books o publishers
                }
                break;

            case "ADD": // Si el comando es ADD
            if (parts.length < 4) {
                socket.write("Invalid ADD command. Please use: ADD 'category' 'name' \n");
                return;
            }

            const regex = /ADD books "(.?)" "(.?)"/;
            const match = message.match(regex);
            //Captura el nombre y la información adicional
            //const name = parts.slice(2, -1).join(" "); // Junta todos los elementos entre el 2º y penúltimo
            //const additionalInfo = parts.slice(-1).join(" "); // El último valor será la información adicional (nacionalidad, autor, etc.)

            //const name = parts.slice(2, parts.length - 1).join(" ");
            //const author = parts.slice(parts.length - 1).join(" ");

            const name = parts.slice(2, parts.length - 1).join(" "); // Captura el título completo
            const author = parts.slice( parts.length - 1).join(" "); // Captura el autor completo

            switch (category) {
                case "authors":
                    const nationality = additionalInfo; // Último valor (nacionalidad)
                    const newAuthor = authorsController.writeAuthors({ name, nationality });
                    socket.write(`Author added: ${JSON.stringify(newAuthor)}\n`);
                    break;

                /*case "books":
                    const author = additionalInfo; // Último valor (autor)
                    const newBook = booksController.writeBooks({ name, author });
                    socket.write(`Book added: ${JSON.stringify(newBook)}\n`);
                    break;*/

              case "books":
                //const newBook = booksController.writeBooks({ name, author });
                //socket.write(`Book added: ${JSON.stringify(newBook)}\n`);
                const newBook = booksController.writeBooks({ name, author });
                socket.write(`Book added: ${JSON.stringify(newBook)}\n`);
                break;

                case "publishers":
                    const country = additionalInfo; // Último valor (país)
                    const newPublisher = publishersController.writePublishers({ name, country });
                    socket.write(`Publisher added: ${JSON.stringify(newPublisher)}\n`);
                    break;

                default:
                    socket.write("Unrecognized category\n");
            }
            break;

            default:
                socket.write("Unrecognized command\n");
                break;
        }
    });

    socket.on('end', () =>{
        console.log("\n the client has disconnected");
    })

    socket.on('error', (err) =>{
        console.log("Error:", err.message);
    })

});


//escuchamos en el puerto 8080
server.listen(port, () =>{
    console.log("The server is listening on port", port);
});