!Hola! si ya llegaste hasta aquí es porque ya descomprimiste el archivo del proyecto.


# PROYECTO BOOK-API 
API para gestionar una biblioteca usando un servidor TCP implementado con Node.js. 

## Instrucciones:
## a. Crea un archivo README.md que explique cómo configurar y ejecutar el proyecto.
   1.Descomprimir el archivo en una carpeta de tu compu.
   2.Debes instalar las dependencias: navega a la carpeta donde descomprimieron el proyecto usando la terminal o línea de comandos: cd ruta/al/proyecto
   3.Luego instala:   npm install  
     este comando sirve para que se puedan instalar las dependencias necesarias que ya vienen en el proyecto (asegurate de tener node.js instalado)
   4.EJECUTA: Una vez que las dependencias estén instaladas, pueden ejecutar el proyecto con: npm start o con server.js o client.js segun lo que necesites.
   
   Todo el codigo esta en idioma inglés, excepto los comentarios.


## b. Incluye ejemplos de comandos que se pueden enviar al servidor TCP y las respuestas esperadas.

Estas son las opciones de comandos y sus versiones que puedes ingresar e igual correra el programa:

comandos = GET, ADD, SEARCH
categorias = authors, books, publishers

### GET para obtener la lista
GET authors - get authors - GET AUTHORS  ||| GET books - get books - GET BOOKS  ||| GET publishers - get publishers - GET PUBLISHERS

### ADD para agregar
ADD authors - add authors - ADD AUTHORS  ||| ADD books - add books - ADD BOOKS  ||| ADD publishers - add publishers - ADD PUBLISHERS

### SEARCH para hacer una busqueda 
SEARCH authors - search authors - SEARCH AUTHORS  ||| SEARCH books - search books - SEARCH BOOKS  ||| SEARCH publishers - search publishers - SEARCH PUBLISHERS

IMPORTANTE: para la busqueda solo se te va a pedir un parámetro que es el nombre de lo que buscas, NO OLVIDES LAS TILDES, sin ellas te saldrá error y NO OLVIDES que al ingresar el nombre debe ser completo, por EJJEMPLO: virginia woolf y no solo virginia

En los archivos CONTROLLERS, en la parte final esta comntado ejemplos para ingresar parametros de cada comando. 


### EXIT para salir
EXIT - exit
   

## c. Asegúrate de que el código esté bien comentado para explicar la funcionalidad de cada sección importante.
Cada archivo tiene codigo comentado para que te puedas guiar.
Todos los comandos responden.

