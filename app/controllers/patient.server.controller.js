// Load the module dependencies
const Patient = require("mongoose").model("Patient");
const Video = require("mongoose").model("Video");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const config = require("../../config/config");
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

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
  console.log("listVideos called");
  // get all video in db, sort it by title in ascending order
  Video.find()
    .sort({ title: "ascending" })
    .exec((err, videos) => {
      if (err) {
        return res.status(500).json(err);
      } else {
        console.log(videos);
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
      console.log("in videoById:", req.video.title);
      console.log("in videoById:", req.video.url);
      next();
    });
};

exports.showVideo = function (req, res) {
  console.log("show video");
  const video = req.video;
  console.log(video.title);
  res.json(video);
};



var fs = require('fs');
var csv = require('csv');
var C45 = require('c4.5');

exports.trainAndPredict = function (req, res) {
  
  console.log("in trainAndPredict?");
  fs.readFile('trainingset_half.csv', function(err, data) {
    if (err) {
      console.log("err1");
      console.error(err);
      return false;
    }
   
    csv.parse(data, function(err, data) {
      if (err) {
        console.log("err2");
        console.error(err);
        return false;
      }
   
      var headers = data[0];
      var features = headers.slice(1,-1); // 
      console.log('feature.length:',features.length);
      var featureTypes = Array(133).fill('category');
     
      var trainingData = data.slice(1).map(function(d) {
        return d.slice(1);
      });
      var target = headers[headers.length-1]; // "disease"
      var c45 = C45();
   
      c45.train({
          data: trainingData,
          target: target,
          features: features,
          featureTypes: featureTypes
      }, function(error, model) {
        if (error) {
          console.log('error3');
          console.error(error);
          return false;
        }
   
        var testData = [
           
          ['1','0','0','0','0','0','0','0','0','0','0','0','0',
          '0','1','0','0','0','0','0','0','1','0','0','0','0','0',
          '0','0','0','0','0','1','1','0','1','0','0','0','1','0','0',
          '1','1','0','0','0','0','1','0','0','0','0','0','0','0','0',
          '0','0','0','0','0','0','0','0','0','0','0','0','0','0','0',
          '0','0','0','0','0','0','0','0','0','0','0','0','0','0','0',
          '0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0',
          '0','0','0','0','0','0','0','0','1','1','0','0','0','0','0','0',
          '0','0','0','0','0','0','0','0','0','0','0','0','0','0']

        ];
        
        //console.log(testData[0].length);
        var model = c45.getModel();
        console.log(model.classify(testData[0]));

      });
    });
  });
}

exports.trainAndPredict1= function(req,res){
  fs.readFile('data.csv', function(err, data) {
    if (err) {
      console.error(err);
      return false;
    }
   
    csv.parse(data, function(err, data) {
      if (err) {
        console.error(err);
        return false;
      }
   
      var headers = data[0];
      var features = headers.slice(1,-1); // ["attr1", "attr2", "attr3"]
      var featureTypes = ['category','number','category'];
      var trainingData = data.slice(1).map(function(d) {
        return d.slice(1);
      });
      var target = headers[headers.length-1]; // "class"
      console.log(target)
      console.log(features)
      var c45 = C45();
   
      c45.train({
          data: trainingData,
          target: target,
          features: features,
          featureTypes: featureTypes
      }, function(error, model) {
        if (error) {
          console.error(error);
          return false;
        }
   
        var testData = [
          ['B',71,'False'],
          ['C',70,'True'],
        ];
   
        console.log(model.classify(testData[0]) === 'CLASS1'); // true
        console.log(model.classify(testData[1]) === 'CLASS2'); // true
      });
    });
  });
}

var DecisionTree = require('decision-tree');
exports.trainAndPredict2 = function (req, res) {
  fs.readFile('trainingset_test.csv', function(err, data) {
    if (err) {
      console.log("err1");
      console.error(err);
      return false;
    }
   
    csv.parse(data, function(err, data) {
      if (err) {
        console.log("err2");
        console.error(err);
        return false;
      }
   
      var headers = data[0];
      var features = headers.slice(0,-1); // 
      console.log(features);

     
      var training_data = data.slice(1).map(function(d) {
        return d.slice(1);
      });
      console.log(training_data);

        var testData = 
          [['0','1','1','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','0','1']]
        ;
      var class_name = "Disease";

      console.log(testData);
      var dt = new DecisionTree(training_data, class_name, features);
      var predicted_class = dt.predict(testData);
      var accuracy = dt.evaluate(testData);
      console.log(predicted_class);
      console.log(accuracy);
      

      
    });
  });


  // var training_data = [
  // 	{"color":"blue", "shape":"square", "liked":false},
  // 	{"color":"red", "shape":"square", "liked":false},
  // 	{"color":"blue", "shape":"circle", "liked":true},
  // 	{"color":"red", "shape":"circle", "liked":true},
  // 	{"color":"blue", "shape":"hexagon", "liked":false},
  // 	{"color":"red", "shape":"hexagon", "liked":false},
  // 	{"color":"yellow", "shape":"hexagon", "liked":true},
  // 	{"color":"yellow", "shape":"circle", "liked":true}
  // ];

  // var test_data = [
  // 	{"color":"blue", "shape":"hexagon", "liked":false},
  // 	{"color":"red", "shape":"hexagon", "liked":false},
  // 	{"color":"yellow", "shape":"hexagon", "liked":true},
  // 	{"color":"yellow", "shape":"circle", "liked":true}
  // ];

 
}