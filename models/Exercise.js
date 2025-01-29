const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const exerciseSchema = new Schema({
    username: { type: String, required: true},
    description: { type: String },
    duration: { type: Number },
    date: {type: Date},
})

const Exercise = model('Exercise', exerciseSchema);
module.exports = Exercise;