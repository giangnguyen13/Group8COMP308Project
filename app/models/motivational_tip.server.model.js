const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const Schema = mongoose.Schema;

const MotivationalTipSchema = new Schema({
    title: String,
    content: String,
    sender: String,
    receiver: {
        type: String,
        default: 'ALL',
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

MotivationalTipSchema.pre('save', function (next) {
    next();
});

MotivationalTipSchema.set('toJSON', {
    getters: true,
    virtuals: true,
});

mongoose.model('MotivationalTip', MotivationalTipSchema);
