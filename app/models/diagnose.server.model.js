const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create model to save motivational videos for patients
const DiagnoseSchema = new Schema({
    disease: String,
    description: String,
    consult_to_doctor: String,
    precautions: [
        {
            type: String,
        },
    ],
});

module.exports = mongoose.model('Diagnose', DiagnoseSchema);
