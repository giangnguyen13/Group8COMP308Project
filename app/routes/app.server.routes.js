// Load the application controllers
const indexController = require('../controllers/index.server.controller');
const patientController = require('../controllers/patient.server.controller');

const PATIENT_API = '/api/patient';

// Define the routes module' method
module.exports = function (app) {
    //handle a get request made to root path
    app.get('/', indexController.render); //go to http://localhost:3000/
    app.get('/logout', indexController.signout);
    app.route(PATIENT_API + 's')
        .get(patientController.list)
        .post(patientController.newPatient);

    app.route(PATIENT_API + '/login').post(patientController.authenticate);
};
