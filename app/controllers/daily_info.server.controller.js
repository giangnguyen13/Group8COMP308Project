const DailyInfo = require('mongoose').model('DailyInfo');
const RequiredVitalSigns = require('mongoose').model('RequiredVitalSigns');

exports.saveDailyInfo = function (req, res) {
    let data = {
        ...req.body,
    };
    var dailyInfo = new DailyInfo(data);

    dailyInfo.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        } else {
            res.status(200).json(dailyInfo);
        }
    });
};

exports.listAllDailyInfoById = function (req, res, next, patientId) {
    var query = { patient: patientId };

    DailyInfo.find(query, function (err, dailyInfos) {
        if (err) {
        return res.status(500).json(err);
        } else {
        res.json(dailyInfos);
        }
    });
};

exports.requiredVitalSigns = function (req, res) {
    let data = {
        ...req.body,
    };
    var requiredVitalSigns = new RequiredVitalSigns(data);
    requiredVitalSigns.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        } else {
            res.status(200).json(requiredVitalSigns);
        }
    });
};

exports.getRequiredVitalSigns = function (req, res, next, patientID) {
    var query = { patient: patientID };
    RequiredVitalSigns.findOne(query)
        .sort({ created: -1 })
        .exec((err, requiredVitalSigns) => {
            if (err) {
                return res.status(500).json(err);
            } else {
                res.json(requiredVitalSigns);
            }
        });
};
