var fs = require('fs');
var csv = require('csv');
var C45 = require('c4.5');

exports.trainModel = function (req, res) {
  console.log("training model");
  fs.readFile('trainingset.csv', function(err, data) { // read csv file
    if (err) {
      console.error(err);
      return false;
    }
   
    csv.parse(data, function(err, data) {
      if (err) {
        console.error(err);
        return false;
      }
   
      var headers = data[0]; // list of header
      var features = headers.slice(0, -1); // exclude Id and disease column for features
      var featureTypes = Array(133).fill('category'); // specify features' datatype
     
      var trainingData = data.slice(0).map(function(d) { // extract data
        return d.slice(0);
      });
      var target = headers[headers.length-1]; // "disease"
      var c45 = C45(); // decision tree model
   
      c45.train({ //train the model
          data: trainingData,
          target: target,
          features: features,
          featureTypes: featureTypes
      }, function(error, model) {
        if (error) {
          console.error(error);
          return false;
        }
   

        var model = c45.getModel();

         fs.writeFileSync('decision-tree-model.json', c45.toJSON())   // uncommand this line to save the model
          console.log('Saved');
        return true;
      });
    });
  });
}