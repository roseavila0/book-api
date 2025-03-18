const responseFormatter = (data) =>{
    if(!data){
        return JSON.stringify({error: "Information not found"})          // Devolvera un error si no se pasa ningún dato
    } return JSON.stringify(data, null, 2);                              // Si hay datos, los formatea y los devuelve.
};

module.exports = {responseFormatter};


