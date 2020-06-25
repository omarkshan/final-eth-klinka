const mongoose = require('mongoose')

const registrationSchema = new mongoose.Schema({
    name: {
        type: String,
        min: 6,
        max: 255
    },
    email : {
        type: String,
        min: 6,
        max: 255
    }
})

module.exports = mongoose.model('Registration', registrationSchema)