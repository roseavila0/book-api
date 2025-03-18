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


    client.on('data', (data) =>{
        console.log("\nServer response:", data.toString().trim());
        promptMenu();
    }); 
}); 
   /*
   try {
        const response = JSON.parse(data.toString().trim());
        console.log("\nServer response:");
        if (response.error) {
            console.log(❌ Error: ${response.error});
        } else {
            for (const [key, value] of Object.entries(response)) {
                console.log(${key}: ${value});
            }
        }
    } catch (e) {
        console.log("\nServer response:", data.toString().trim());
    }
    promptMenu();*/


// Función para mostrar el menú y capturar comandos
function promptMenu() {
    console.log("\n📌 COMMANDS:");
    console.log("GET authors | GET books | GET publishers");
    console.log("ADD authors | ADD books | ADD publishers");
    console.log("SEARCH authors | SEARCH books | SEARCH publishers");
    console.log("Type 'EXIT' to quit.");

    rl.question("\n👉 Input a command: ", (input) => {
        const args = input.trim().split(" ");
        const command = args[0]?.toUpperCase();
        const category = args[1]?.toLowerCase();

        if (!input.trim()) {
            console.log("⚠️ Please enter a valid command.");
            return promptMenu();
        }

        if (command === "EXIT") {
            console.log("👋 Bye!");
            rl.close();
            client.end();
            return;
        }

        if (command === "GET") {
            if (category === "authors" || category === "books" || category === "publishers") {
                client.write(input);
                return;
            } else {
                console.log("❌ Category not found.");
                return promptMenu();
            }
        }

        if (command === "ADD") {
            if (category === "authors") {
                return rl.question("📝 Author's name: ", (authorsName) => {
                    rl.question("🌍 Nationality: ", (authorsNationality) => {
                        client.write(`ADD authors "${authorsName}" "${authorsNationality}"`);
                    });
                });
            } else if (category === "books") {
                return rl.question("📖 Book's name: ", (bookName) => {
                    rl.question("✍️ Book's author: ", (bookAuthor) => {
                        client.write(`ADD books "${bookName}" "${bookAuthor}"`);
                    });
                });
            } else if (category === "publishers") {
                return rl.question("🏢 Publisher's name: ", (publisherName) => {
                    rl.question("🌍 Publisher's country: ", (publisherCountry) => {
                        client.write(`ADD publishers "${publisherName}" "${publisherCountry}"`);
                    });
                });
            }
        }

        if (command === "SEARCH") {
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

        console.log("❌ Unrecognized command.");
        promptMenu();
    });
}

// Manejo de errores y desconexión
client.on('error', (error) => console.error("❌ Error:", error));
client.on('end', () => console.log("🔌 Disconnected from server."));