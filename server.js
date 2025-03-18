
//Importo el modulo net para crear servidores TCP y las rutas de los archivos de la carpeta de controller. Tambien declare la variable puerto con el número de puerto 8080.
const net =  require ('net');
const {authorsController} = require ('./controllers/authorsController');
const {booksController} = require ('./controllers/booksController')
const {publishersController} = require ('./controllers/publishersController');
const port = 8080;

//creo el servidor
const server = net.createServer ((socket) => {
    console.log("Client connected");

    //Recibimos la data del cliente
    socket.on('data', (data) => {
        const message = data.toString().trim();          // con el to.string Convierte el Buffer a String y con trim se eliminan espacios antes y despues.
        console.log("Data received: ", message);
    
    //Usamos la expresión regular para dividir los datos del cliente en partes. Así, podemos separar las palabras y las frases entre comillas, lo que nos ayuda a entender el comando y la categoría, como GET, ADD, SEARCH, y authors, books, publishers."    
    // // (/(?:[^\s"]+|"[^"]*")+/g) Esta expresión regular encuentra palabras fuera de comillas y frases completas dentro de comillas dobles, permitiendo comillas vacías. Encuentra palabras sueltas y frases dentro de comillas, incluyendo las comillas vacías.
        const args = message.match(/(?:[^\s"]+|"[^"]*")+/g);  //El método .match() se utiliza para encontrar todas las coincidencias de la expresión regular proporcionada en la cadena message.
        console.log('Args:', args);                           // Verificamos los argumentos

        if (!args || args.length < 2) {                     //sino hay argumentos o la longitus es menor a 2 osea si solo envia el comando(GET/ADD/SEARCH) o la categoria(authors/books/publishers) da un msj de formato de comando invalido.
            socket.write("Invalid command format\n");
            return;
        };

        const command = args[0].toUpperCase();         //tranforma a Mayuscula los comandos y 
        const category = args[1].toLowerCase();       //en minuscula las categorias.

        switch (command) {                              //uso switch en lugar de if -else para tener una mejor legibilidad ya que hay opciones de comandos y categorías como sub-opciones a escojer.
            case "GET":                                // Si el comando es GET
                switch (category) {
                    case "authors":                          
                        const authors = JSON.parse(authorsController.showAuthors());      //si se escoge la opcion GET authors o books o publishers, lo que pasara es que se llamara a la funcion de showauthors o books o publishers que esta 
                        socket.write(`Authors: ${JSON.stringify(authors, null, 2)}\n`);   //en el archivo correspondiente de la carpeta controller la cual esta ligada a la carpeta module y el archivo correspondiente con la funcion read authors y el formato del archivo responseFormatter de la carpeta views para mostrar la data.  
                        break;                                                            //y asi sucesivamente se maneja en general por cada comando/categoría.(variando segun el caso).
                    case "books":
                        const books = JSON.parse(booksController.showBooks());
                        socket.write(`Books: ${JSON.stringify(books, null, 2)}\n`);       //se envia la info al client 
                        break;
                    case "publishers":
                        const publishers = JSON.parse(publishersController.showPublishers());
                        socket.write(`Publishers: ${JSON.stringify(publishers, null, 2)}\n`);
                        break;
                    default:
                        socket.write("Unrecognized category\n");                            //si la categoria que se ingreso esta incorrecta o mal escrita, nos da un msj que dice: categoria desconocida /unrecognized category
                }
                break;

            case "ADD":                                                                     // SIII EL COMANDO ES ADD
                if (args.length < 4) {
                    socket.write("Invalid ADD command. Please use: ADD \"category\" \"name\" \"info\" \n");    // recordemos que el arg[0] es el comando, el args[1] la categoría y para agregar nueva info necesitamos los argumentos que vendrian  
                    return;                                                                                    //a ser la info de libros como name y la info segun el caso, es decir args[2] y [3] pero segun la longitud se endiendo como 1,2,3,4 elementos. 
                }                                                                                              //entonces por eso dice que si la longitud de los argumentos que se reciben es menor a 4 es invalido lo ingresado y muestra un msj que te guia sobre que ingresar).
                                                                                                            
                const name = args[2].replace(/"/g, "").trim();                             // Se eliminan las comillas con .replace(/\"/g, "") para obtener el texto real.                    
                const additionalInfo = args[3].replace(/"/g, "").trim();                   //RECUERDAAAAAAAAAAAAAAAAAAA .trim() Asegura que no haya espacios extra al inicio o final.

                switch (category) {
                    case "authors":
                        const nationality = additionalInfo;
                        const newAuthor = authorsController.writeAuthors({ name, nationality });    //estos son los parametros de newAuthor
                        socket.write(`Author added: ${JSON.stringify(newAuthor)}\n`);          //se envia la info al client 
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

            case "SEARCH":                                                                                // Si el comando es SEARCH                                                                                         
                 if (args.length < 3) {                                                                  
                    socket.write("Invalid SEARCH command. Please use: SEARCH \"category\" \"search info\"\n");  
                    return;
                }
               const searchInfo = args[2].replace(/"/g, "").trim();      
                //const searchInfo = args[2].trim();                                 //se busca el segundo argumento, le deje para buscar solo por el nombre ya sea de autores,libros o editoriales.
                                                                                                        
                                                                                                          
                switch (category) {
                    case "authors":
                        const authorsResult = authorsController.searchAuthor(searchInfo);
                        socket.write(`Search result: ${JSON.stringify(authorsResult, null, 2)}\n`);
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