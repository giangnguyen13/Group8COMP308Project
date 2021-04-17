var express = require('express');
var router = express.Router();
// Load the application controllers
const indexController = require('../controllers/index.server.controller');
const patientController = require('../controllers/patient.server.controller');
const nurseController = require('../controllers/nurse.server.controller');
const trainController = require('../controllers/train_model.server.controller');
const dailyInfoController = require('../controllers/daily_Info.server.controller');

const PATIENT_API = '/api/patient';
const NURSE_API = '/api/nurse';
const API = '/api';

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

    app.route(API + '/dailyInfo').post(dailyInfoController.saveDailyInfo);

    app.route(NURSE_API + '/requiredVitalSigns').post(
        dailyInfoController.requiredVitalSigns
    );

    app.route(NURSE_API + '/listPatients').get(patientController.list);

    app.param('patientId', patientController.listAllDailyInfoById);
    app.route(API + '/listAllDailyInfoById/:patientId').get(
        patientController.listAllDailyInfoById
    );

    app.param('patientID', dailyInfoController.getRequiredVitalSigns);
    app.route(NURSE_API + '/getRequiredVitalSigns/:patientID').get(
        dailyInfoController.getRequiredVitalSigns
    );

    app.route('/train').get(trainController.trainModel);

    app.route(PATIENT_API + '/checklist')
        .get(patientController.checkList)
        .post(patientController.diagnose);

    app.route(PATIENT_API + '/emergency').post(
        patientController.createEmergencyAlert
    );

    app.route(NURSE_API + '/emergency/:nurseId').get(
        nurseController.getListEmergencyAlert
    );

    app.param('nurseId', nurseController.nurseById);
};
