const {readAuthors, writeAuthors,searchAuthor} = require('../models/authorsModel');
const {responseFormatter} = require('../views/responseFormatter');

const authorsController = {
    showAuthors: () => {
        const authors = readAuthors();
        return responseFormatter(authors); 
    },
    
    writeAuthors: (newAuthor) => {
        writeAuthors(newAuthor);
        return responseFormatter(newAuthor);
    },

    searchAuthor: (searchInfo) => {
        const results = searchAuthor(searchInfo);
        return results;
    }
};

module.exports = { authorsController };