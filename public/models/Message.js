const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    user_key: {
        type: String,
        required: true
    },
    EHR_id: {
        type: [String],
        required: true
    },
    EHR_date: {
        type: [String],
        required: true
    },
    EHR_symptoms: {
        type: [String],
        required: true
    },
    EHR_severity: {
        type: [String],
        required: true
    },
    EHR_Notes: {
        type: [String],
        required: true
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message