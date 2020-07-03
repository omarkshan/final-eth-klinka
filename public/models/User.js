const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    user_key: {
        type: String,
        required: true,
        unique: true
    },
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
    },
    isVerified: {
        type: Boolean,
        required: true
    },
    isSupervisor: {
        type: Boolean,
        required: true
    }
})

const User = mongoose.model('User', userSchema)

module.exports = User