const mongoose = require('mongoose')

const EHR_PatientSchema = new mongoose.Schema({
    user_key: {
        type: String,
        required: true
    },
    physician_user_key: {
        type: [String],
        required: true
    },
    date: {
        type: [String],
        required: true
    },
    symptoms: {
        type: [String],
        required: true
    },
    severity: {
        type: [String],
        required: true
    },
    Notes: {
        type: [String],
        required: true
    }
})

const EHR_Patient = mongoose.model('EHR_Patient', EHR_PatientSchema)

module.exports = EHR_Patient