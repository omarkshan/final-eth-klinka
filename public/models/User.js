const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_key: {
        type: String,
        required: true
    },
    firstName: {
        type: String,
        maxlength: 35,
        required: true
    },
    lastName: {
        type: String,
        maxlength: 35,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    speciality: {
        type: String,
        required: true
    },
    effort: {
        type: String,
        required: true
    },
    isPhysician: {
        type: Boolean,
        required: true
    },
    employedSince: {
        type: Date,
        required: false
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User