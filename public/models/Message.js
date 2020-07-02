const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    sender: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isNew: {
        type: Boolean,
        required: true
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message