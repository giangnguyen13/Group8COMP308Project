var express = require('express');
var router = express.Router();
// Load the application controllers
const indexController = require('../controllers/index.server.controller');
const patientController = require('../controllers/patient.server.controller');
const nurseController = require('../controllers/nurse.server.controller');

const PATIENT_API = '/api/patient';
const NURSE_API = '/api/nurse';

// Define the routes module' method
module.exports = function (app) {
    //handle a get request made to root path
    app.get('/', indexController.render); //go to http://localhost:3000/
    app.get('/logout', indexController.signout);
    app.route(PATIENT_API + 's')
        .get(patientController.list)
        .post(patientController.newPatient);

    app.route(PATIENT_API + '/login').post(patientController.authenticate);

    app.route(NURSE_API + 's')
        .get(nurseController.list)
        .post(nurseController.newNurse);

    app.route(NURSE_API + '/login').post(nurseController.authenticate);

    //populate list of videos
    app.route(PATIENT_API + '/videos').get(patientController.listVideos);

    app.route(PATIENT_API + '/videos/:videoId').get(
        patientController.showVideo
    );

    app.param('videoId', patientController.videoById);
    app.route(NURSE_API + '/tip')
        .get(nurseController.getListMotivationalTip)
        .post(nurseController.createMotivationalTip);
};
