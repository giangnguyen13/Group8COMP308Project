// Load the module dependencies
const Patient = require("mongoose").model("Patient");
const Video = require("mongoose").model("Video");
const EmergencyAlert = require("mongoose").model("EmergencyAlert");
const Diagnosis = require("mongoose").model("Diagnose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;
var C45 = require("c4.5");

exports.newPatient = function (req, res) {
  let data = {
    ...req.body,
  };
  console.log(data);
  var newPatient = new Patient(data);
  console.log(newPatient);

  newPatient.save(function (err) {
    if (err) {
      console.log(err);
      return res.status(500).json(err);
    } else {
      res.status(200).json(newPatient);
    }
  });
};

exports.authenticate = function (req, res, next) {
  const email = req.body.auth.email;
  const password = req.body.auth.password;

  //find the user with given username using static method findOne
  Patient.findOne({ email: email }, (err, user) => {
    if (err) {
      return next(err);
    } else {
      //compare passwords
      if (bcrypt.compareSync(password, user.password)) {
        const token = jwt.sign(
          { id: user._id, fullName: user.fullName },
          jwtKey,
          { algorithm: "HS256", expiresIn: jwtExpirySeconds }
        );
        res.cookie("token", token, {
          maxAge: jwtExpirySeconds * 1000,
          httpOnly: false,
        });
        res.status(200).send({
          patientName: user.fullName,
          patientId: user._id,
        });
        next();
      } else {
        res.status(401).json({
          status: "error",
          message: "Invalid username/password!!!",
          data: null,
        });
      }
    }
  });
};

exports.isAuthenticated = function (req, res, next) {
  const token = req.cookies.token;
  if (!token) {
    return res.status(405).send({ message: "Not login yet" }).end();
  }
  var payload;
  try {
    payload = jwt.verify(token, jwtKey);
    console.log("in requiresLogin - payload:", payload);
    req.id = payload.id;
  } catch (e) {
    if (e instanceof jwt.JsonWebTokenError) {
      // if the error thrown is because the JWT is unauthorized, return a 401 error
      return res.status(401).end();
    }
    // otherwise, return a bad request error
    return res.status(400).end();
  }
  next();
};

// Returns all users
exports.list = function (req, res, next) {
  Patient.find({}, function (err, patients) {
    if (err) {
      return res.status(500).json(err);
    } else {
      res.json(patients);
    }
  });
};

// Returns all videos in db
exports.listVideos = function (req, res, next) {
  // get all video in db, sort it by title in ascending order
  Video.find()
    .sort({ title: "ascending" })
    .exec((err, videos) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        res.json(videos);
      }
    });
};

// 'videoById' controller method to find a video by its id
exports.videoById = function (req, res, next, id) {
  Video.findById(id)
    .populate("", "title url")
    .exec((err, video) => {
      if (err) return next(err);

      if (!video) return next(new Error("Failed to load Video " + id));

      req.video = video;
      next();
    });
};

exports.showVideo = function (req, res) {
  console.log("show video");
  const video = req.video;
  console.log(video.title);
  res.json(video);
};

//populate checkList page to the patient
exports.checkList = function (req, res) {
  const symptoms = require("../../symptoms.json"); // list of symptoms
  // res.render('checklist', {
  //   title:"checklist", symptoms:symptoms});
  res.json(symptoms);
};

exports.diagnose = function (req, res, next) {
  console.log(req.body);
  const symtomArr = req.body;
  console.log(symtomArr);
  var testData = Array(133).fill("FALSE");
  symtomArr.forEach((index) => {
    testData[index - 1] = "TRUE";
    console.log("inedx", index - 1);
  });

  var c45 = C45();
  var state = require("../../decision-tree-model.json");
  c45.restore(state);
  var model = c45.getModel();

  var result = model.classify(testData);
  console.log(result);
  if (result == "unknown") {
    res.json(null);
  } else {
    Diagnosis.findOne({ disease: result }, (err, disease) => {
      if (err) {
        return next(err);
      } else {
        console.log(disease);
        var jsonDisease = JSON.parse(JSON.stringify(disease));
        res.json(jsonDisease);
      }
    });
  }
};

exports.createEmergencyAlert = function (req, res) {
  let data = {
      ...req.body
  };
  var newEmergencyAlert = new EmergencyAlert(data);
  
  newEmergencyAlert.save(function (err) {
      if (err) {
          console.log(err);
          return res.status(500).json(err);
      } else {
          res.status(200).json(newEmergencyAlert);
      }
  });
};
