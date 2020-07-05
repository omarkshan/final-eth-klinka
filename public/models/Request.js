const mongoose = require('mongoose')

const requestSchema = new mongoose.Schema({
    PID: {
        type: String,
        required: true,
        unique: true
    },
    alias: {
        type: String,
        maxlength: 10,
        required: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    }
})

const Request = mongoose.model('Request', requestSchema)

module.exports = Request