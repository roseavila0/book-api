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
    console.log("\nServer response:", data.toString().trim());
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
        console.log("Input 'EXIT' to quit.");


   rl.question("\nInput a command: ", (input) => {
    //input = input
   

   // Salir del cliente si se ingresa 'exit'
   if (input === 'EXIT') {
    console.log("Bye!");
    rl.close(); // Cerrar la interfaz
    client.end(); // Cerrar la conexión al servidor
    return;
} else if (input.trim() === '') {
    console.log("Please enter a valid command.");
} else {
    // Aquí puedes procesar el comando cuando sea válido
    // Esto asegurará que se vuelva a mostrar el menú después de cada interacción
    

//promptMenu();  // Esto asegura que el menú se muestre después de cada comando
    
    if (input.startsWith("GET")) {  //sino verificamos si el comando empieza con GET
    client.write(input);
    
    
    } else if (input.startsWith("ADD")) { //o sino verificamos si el comando empieza con ADD
    const parts = input.split(" ");
    const category = parts[1];


    if (category === "authors") {
    rl.question("Input an author: ", (authorsName) => {
        rl.question("Input the author's nationality: ", (authorsNationality) => {
            client.write(`ADD authors "${authorsName}" "${authorsNationality}"`);
        });
    });
    
    } else if (category === "books") {
        rl.question("Input the book's title: ", (bookName) => {
            rl.question("Input the book's author: ", (bookAuthor) => {
                client.write(`ADD books "${bookName}" "${bookAuthor}"`);
            });
        });
   
    } else if (category === "publishers") {
        rl.question("Input the publisher's name: ", (publisherName) => {
            rl.question("Input the publisher's country: ", (publisherCountry) => {
                client.write(`ADD publishers "${publisherName}" "${publisherCountry}"`);
            });
        });

    } else {
        console.log("Category not found\n");
        //promptMenu();
    }
} else {
    console.log("Unrecognized command\n");
    //promptMenu();
}
}
});
}
 

//manejamos errores 
client.on('error', (error) =>{
    console.error(error);
});

client.on('end', ()  => {
    console.log("Disconnected from server");
    rl.close(); // Cerramos la interfaz de readline al desconectar
});

