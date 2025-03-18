const net = require ('net');
const {authorsController} = require ('./controllers/authorsController');
const {booksController} = require ('./controllers/booksController')
const {publishersController} = require ('./controllers/publishersController');
const readline = require('readline');

const PORT = 8080;
const HOST = 'localhost';

//creamos la interfaz para que el usuario pueda ingresar datos y recibir respuestas del server.
const rl =  readline.createInterface({
    input:process.stdin,
    output:process.stdout,
});

//creamos el cliente 
const client = net.createConnection({port: PORT, host: HOST}, () =>{  
    console.log("Hello client, you have connected to the server.");
    promptMenu(); // Llamamos al menú de comandos inmediatamente después de conectar

});

client.on('data', (data) =>{
    /*console.log("\nServer response:", data.toString().trim());
    promptMenu();*/
    try {
        const response = JSON.parse(data.toString().trim());
        console.log("\nServer response:");
        if (response.error) {
            console.log(`❌ Error: ${response.error}`);
        } else {
            for (const [key, value] of Object.entries(response)) {
                console.log(`${key}: ${value}`);
            }
        }
    } catch (e) {
        console.log("\nServer response:", data.toString().trim());
    }
    promptMenu();
});




//funcion para llamar el menú de comandos /opciones.
function promptMenu() { 
        console.log("\n COMMANDS: ");
        console.log("GET authors");
        console.log("ADD authors");
        console.log("GET books");
        console.log("ADD books");
        console.log("GET publishers");
        console.log("ADD publishers");
        console.log("SEARCH authors");
        console.log("SEARCH books");
        console.log("SEARCH publishers");
        console.log("Input 'EXIT' to quit.");


   rl.question("\nInput a command: ", (input) => {
    const args = input.trim().split(" ");
    const command = args[0].toUpperCase();
    const category = args[1]?.toLowerCase();

    if (!input.trim()) {
        console.log("Please enter a valid command.");
        return promptMenu();
    }

    if (command === "EXIT") {
        console.log("Bye!");
        client.write("EXIT\n");
        rl.close();
        client.end();
        return;
    }

    if (command === "GET") {
        if (["authors", "books", "publishers"].includes(category)) {
            client.write(input);
        } else {
            console.log("Invalid category for GET.");
        }
        return promptMenu();
    }

    if (command === "ADD") {
        if (category === "authors") {
            rl.question("Input an author: ", (authorsName) => {
                rl.question("Input the author's nationality: ", (authorsNationality) => {
                    client.write(`ADD authors "${authorsName}" "${authorsNationality}"`);
                    promptMenu();
                });
            });
        } else if (category === "books") {
            rl.question("Input the book's title: ", (bookName) => {
                rl.question("Input the book's author: ", (bookAuthor) => {
                    client.write(`ADD books "${bookName}" "${bookAuthor}"`);
                    promptMenu();
                });
            });
        } else if (category === "publishers") {
            rl.question("Input the publisher's name: ", (publisherName) => {
                rl.question("Input the publisher's country: ", (publisherCountry) => {
                    client.write(`ADD publishers "${publisherName}" "${publisherCountry}"`);
                    promptMenu();
                });
            });
        } else {
            console.log("Invalid category for ADD.");
            promptMenu();
        }
        return;
    }

    if (command === "SEARCH") {
        if (category === "authors") {
            rl.question("Input the author's name to search: ", (authorName) => {
                client.write(`SEARCH authors "${authorName}"`);
                promptMenu();
            });
        } else if (category === "books") {
            rl.question("Input the book's title: ", (bookName) => {
                client.write(`SEARCH books "${bookName}"`);
                promptMenu();
            });
        } else if (category === "publishers") {
            rl.question("Input the publisher's name: ", (publisherName) => {
                client.write(`SEARCH publishers "${publisherName}"`);
                promptMenu();
            });
        } else {
            console.log("Invalid category for SEARCH.");
            promptMenu();
        }
        return;
    }

    console.log("Unrecognized command.\n");
    promptMenu();
});
}

// Manejamos errores
client.on('error', (error) => {
console.error(error);
});

client.on('end', () => {
console.log("Disconnected from server");
rl.close();
});