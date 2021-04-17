const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RequiredVitalSignsSchema = new Schema({
    pulseRate: {
        type: Boolean,
    },
    bloodPressure: {
        type: Boolean,
    },
    weight: {
        type: Boolean,
    },
    temperature: {
        type: Boolean,
    },
    respiratoryRate: {
        type: Boolean,
    },
    created_by: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    updated: {
        type: Date,
        default: Date.now,
    },
    patient: {
        type: Schema.ObjectId,
        ref: 'Patient',
    },
});


mongoose.model('RequiredVitalSigns', RequiredVitalSignsSchema);
