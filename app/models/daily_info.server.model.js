const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const DailyInfoSchema = new Schema({
    pulseRate: {
        type: String,
    },
    bloodPressure: {
        type: String,
    },
    weight: {
        type: String,
    },
    temperature: {
        type: String,
    },
    respiratoryRate: {
        type: String,
    },
    created: {
        type: Date,
        default: Date.now,
    },
    created_by: {
        type: String,
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


mongoose.model('DailyInfo', DailyInfoSchema);
