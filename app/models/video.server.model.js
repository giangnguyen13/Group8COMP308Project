const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//create model to save motivational videos for patients
const VideoSchema = new Schema({
    title: String,
    url: String,
});

module.exports = mongoose.model('Video', VideoSchema);
