const DailyInfo = require("mongoose").model("DailyInfo");

const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtKey = config.secretKey;

exports.saveDailyInfoPatient = function (req, res) {

  var payload = null;
    try {
        payload = jwt.verify(req.cookies.token, jwtKey);
    } catch (e) {
        console.log('Not logged in');
    }

    var patientId = payload != null ? payload.id : null;

    // let data = {
    //   ...req.body,
    // };
    console.log(patientId);

    if(patientId != null){
      let data = {
        pulseRate: req.body.pulseRate,
        bloodPressure: req.body.bloodPressure,
        weight: req.body.weight,
        temperature: req.body.temperature,
        respiratoryRate: req.body.respiratoryRate,
        patient: "6069f2eb6676de558012d72c"//patientId
      };

      console.log(data);
      var dailyInfo = new DailyInfo(data);
      console.log(dailyInfo);

      dailyInfo.save(function (err) {
        if (err) {
          console.log(err);
          return res.status(500).json(err);
        } else {
          res.status(200).json(dailyInfo);
        }
      });
    }
    
  };


  exports.saveDailyInfoNurse = function (req, res) {
    // let data = {
    //   ...req.body,
    // };
    console.log("test");
    let data = {
      pulseRate: req.body.pulseRate,
      bloodPressure: req.body.bloodPressure,
      weight: req.body.weight,
      temperature: req.body.temperature,
      respiratoryRate: req.body.respiratoryRate,
      patient: req.params.patientId
    };

    console.log(data);
    var dailyInfo = new DailyInfo(data);
    console.log(dailyInfo);
  
    dailyInfo.save(function (err) {
      if (err) {
        console.log(err);
        return res.status(500).json(err);
      } else {
        res.status(200).json(dailyInfo);
      }
    });
  };
