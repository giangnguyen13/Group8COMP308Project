const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    firstName: {
        type: String,
        trim: true,
        required: 'First Name is required',
    },
    lastName: {
        type: String,
        trim: true,
        required: 'First Name is required',
    },
    email: {
        type: String,
        // Validate the email format
        match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
        type: String,
        // Validate the 'password' value length
        validate: [
            (password) => password && password.length > 6,
            'Password should be longer',
        ],
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

// Set the 'fullname' virtual property
PatientSchema.virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    })
    .set(function (fullName) {
        const splitName = fullName.split(' ');
        this.firstName = splitName[0] || '';
        this.lastName = splitName[1] || '';
    });

// Use a pre-save middleware to hash the password
// before saving it into database
PatientSchema.pre('save', function (next) {
    //hash the password before saving it
    this.password = bcrypt.hashSync(this.password, saltRounds);
    // if (this.created != undefined) {
    //     this.created = new Date(this.created);
    // }
    next();
});

// Create an instance method for authenticating user
PatientSchema.methods.authenticate = function (password) {
    //compare the hashed password of the database
    //with the hashed version of the password the user enters
    return this.password === bcrypt.hashSync(password, saltRounds);
};

PatientSchema.set('toJSON', {
    getters: true,
    virtuals: true,
});

module.exports = mongoose.model('Patient', PatientSchema);
