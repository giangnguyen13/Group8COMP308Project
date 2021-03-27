const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const NurseSchema = new Schema({
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
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
});

NurseSchema.set('toJSON', {
    getters: true,
    virtuals: true,
});

mongoose.model('Nurse', NurseSchema);
