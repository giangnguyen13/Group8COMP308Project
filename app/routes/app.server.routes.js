// Load the application controllers
const indexController = require('../controllers/index.server.controller');
const apiPrefix = '/api/';

// Define the routes module' method
module.exports = function (app) {
    //handle a get request made to root path
    app.get('/', indexController.render); //go to http://localhost:3000/
};
