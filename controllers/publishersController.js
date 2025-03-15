const {readPublishers, writePublishers, searchPublisher} = require('../models/publishersModel');
const {responseFormatter} = require('../views/responseFormatter');

const publishersController = {
    showPublishers: () => {
        const Publishers = readPublishers();
        return responseFormatter(Publishers); 
    },
    
    writePublishers: (newPublisher) => {
        writePublishers(newPublisher);
        return responseFormatter(newPublisher);
    },

    searchPublisher: (searchInfo) => {
        const results = searchPublisher(searchInfo);
        return results;
    }
};

module.exports = { publishersController };