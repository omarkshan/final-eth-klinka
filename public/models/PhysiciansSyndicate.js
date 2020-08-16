const mongoose = require('mongoose')

const physiciansSyndicateSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    referenceId: {
        type: String,
        required: true
    }
})

const PhysiciansSyndicate = mongoose.model('PhysiciansSyndicate', physiciansSyndicateSchema);

module.exports = PhysiciansSyndicate;