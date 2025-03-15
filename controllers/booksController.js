const {readBooks, writeBooks ,searchBook} = require('../models/booksModel');
const {responseFormatter} = require('../views/responseFormatter');

const booksController = {
    showBooks: () => {
        const books = readBooks();
        return responseFormatter(books); 
    },
    
    writeBooks: (newBook) => {
        writeBooks(newBook);
        return responseFormatter(newBook);
    },

    searchBook: (searchInfo) => {
        const results = searchBook(searchInfo);
        return results;
    }
};

module.exports = { booksController };