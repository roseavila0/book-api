// Importo el módulo net para crear el cliente TCP y readline para manejar la entrada del usuario.
const net = require ('net');
const {authorsController} = require ('./controllers/authorsController');
const {booksController} = require ('./controllers/booksController')
const {publishersController} = require ('./controllers/publishersController');
const readline = require('readline');

// Defino el puerto y host al que se conectará el cliente
const PORT = 8080;
const HOST = 'localhost';


const rl =  readline.createInterface({                                        // Creo la interfaz para que el usuario pueda ingresar comandos y recibir respuestas del servidor
    input:process.stdin,
    output:process.stdout,
});


const client = net.createConnection({port: PORT, host: HOST}, () =>{          // Creo el cliente TCP y me conecto al servidor en el puerto y host definidos
    console.log("Hello client, you have connected to the server.");
    promptMenu();                                                            // Llamo al menú de comandos inmediatamente después de conectarme


    client.on('data', (data) =>{                                              // se recibe datos del servidor
       console.log("\nServer response:", data.toString().trim());            // se Imprime la respuesta del servidor
        promptMenu();                                                       // Vuelve a mostrar el menú después de recibir una respuesta 
    }); 
}); 
   

// Función para mostrar el menú 
function promptMenu() {
    console.log("\n📌 COMMANDS:");
    console.log("GET authors    | GET books    | GET publishers");
    console.log("ADD authors    | ADD books    | ADD publishers");
    console.log("SEARCH authors | SEARCH books | SEARCH publishers");
    console.log("Type 'EXIT' to quit.");

    rl.question("\n👉 Input a command: ", (input) => {
        const args = input.trim().split(" ");                               // Separamos la entrada en palabras
        const command = args[0]?.toUpperCase();                             // Extraemos el comando en mayúsculas
        const category = args[1]?.toLowerCase();                            // Extraemos la categoría en minúsculas

        if (!input.trim()) {                                                // Si el usuario no ingresa nada
            console.log("Please enter a valid command.");
            return promptMenu();                                            // se Vuelve a mostrar el menú
        }

        if (command === "EXIT") {                                           // Si el usuario ingresa EXIT
            console.log("👋 Bye!");
            rl.close();                                                     // se cierra la interfaz readline
            client.end();                                                   // se cierra la conexión con el servidor
            return;  
        }

        if (command === "GET") {                                                // si el usuario ingresa GET
            if (category === "authors" || category === "books" || category === "publishers") {
                client.write(input);                                            // envia el comando y su categoría al servidor.
                return;
            } else {
                console.log("Category not found.");                           // si la categoría es incorrecta, envia un msj de error y vuelve a mostrar el menú
                return promptMenu();
            }
        }

        if (command === "ADD") {                                                  // si el usuario quiere agregar datos.
            if (category === "authors") {
                return rl.question("Author's name: ", (authorsName) => {                 //pide el ingreso de parametros segun cada categoría
                    rl.question("Nationality: ", (authorsNationality) => {
                        client.write(`ADD authors "${authorsName}" "${authorsNationality}"`);  // envía el comando al servidor.
                    });
                });
            } else if (category === "books") {
                return rl.question("Book's name: ", (bookName) => {
                    rl.question("Book's author: ", (bookAuthor) => {
                        client.write(`ADD books "${bookName}" "${bookAuthor}"`);
                    });
                });
            } else if (category === "publishers") {
                return rl.question("Publisher's name: ", (publisherName) => {
                    rl.question("Publisher's country: ", (publisherCountry) => {
                        client.write(`ADD publishers "${publisherName}" "${publisherCountry}"`);
                    });
                });
            }
        }

        if (command === "SEARCH") {                                                      // Si el usuario quiere buscar información.
            if (category === "authors") {
                return rl.question("🔎 Author's name: ", (authorsName) => {
                    client.write(`SEARCH authors "${authorsName}"`);
                });
            } else if (category === "books") {
                return rl.question("🔎 Book's name: ", (bookName) => {
                    client.write(`SEARCH books "${bookName}"`);
                });
            } else if (category === "publishers") {
                return rl.question("🔎 Publisher's name: ", (publisherName) => {
                    client.write(`SEARCH publishers "${publisherName}"`);
                });
            }
        }

        console.log("Unrecognized command.");                                           // Si el comando es inválido, muestra en consola un msj de error y
        promptMenu();                                                                   // vuelve a mostrar el menú.
    });
}

// Manejo de errores y desconexión
/*client.on('error', (error) => console.error(" Error:", error));
client.on('end', () => console.log("🔌 Disconnected from server."));*/

//manejamos errores 
client.on('error', (error) =>{
    console.error(error);
});

//desconectamos el client del server
client.on('end', ()  => {
    console.log("Disconnected from server");
    rl.close(); // Cerramos la interfaz de readline al desconectar
});