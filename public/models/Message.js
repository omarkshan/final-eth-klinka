const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
    user_key: {
        type: String,
        required: true
    },
    subject: {
        type: [String],
        required: true
    },
    from: {
        type: [String],
        required: true
    },
    type: {
        type: [String],
        required: true
    },
    content: {
        type: [String],
        required: true
    },
    isSent: {
        type: [Boolean],
        required: true
    }
})

const Message = mongoose.model('Message', messageSchema)

module.exports = Message