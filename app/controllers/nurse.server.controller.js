// Load the module dependencies
const Nurse = require('mongoose').model('Nurse');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config');
const jwtExpirySeconds = 300;
const jwtKey = config.secretKey;

exports.newNurse = function (req, res) {
    let data = {
        ...req.body,
    };
    var newNurse = new Nurse(data);

    newNurse.save(function (err) {
        if (err) {
            console.log(err);
            return res.status(500).json(err);
        } else {
            res.status(200).json(newNurse);
        }
    });
};

exports.authenticate = function (req, res, next) {
    const username = req.body.auth.username;
    const password = req.body.auth.password;

    //find the user with given username using static method findOne
    Nurse.findOne({ username: username }, (err, user) => {
        if (err) {
            return next(err);
        } else {
            //compare passwords
            if (bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign(
                    { id: user._id, fullName: user.fullName },
                    jwtKey,
                    { algorithm: 'HS256', expiresIn: jwtExpirySeconds }
                );
                res.cookie('token', token, {
                    maxAge: jwtExpirySeconds * 1000,
                    httpOnly: false,
                });
                res.status(200).send({
                    nurseName: user.fullName,
                    nurseId: user._id,
                });
                next();
            } else {
                res.status(401).json({
                    status: 'error',
                    message: 'Invalid username/password!!!',
                    data: null,
                });
            }
        }
    });
};

exports.isAuthenticated = function (req, res, next) {
    const token = req.cookies.token;
    if (!token) {
        return res.status(405).send({ message: 'Not login yet' }).end();
    }
    var payload;
    try {
        payload = jwt.verify(token, jwtKey);
        console.log('in requiresLogin - payload:', payload);
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
    Nurse.find({}, function (err, nurses) {
        if (err) {
            return res.status(500).json(err);
        } else {
            res.json(nurses);
        }
    });
};
