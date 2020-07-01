const mongoose = require('mongoose')

const EHR_PhysicianSchema = new mongoose.Schema({
    user_key: {
        type: String,
        required: true
    },
    patients_user_key: {
        type: [String],
        required: true
    }
})

const EHR_Physician = mongoose.model('EHR_Physician', EHR_PhysicianSchema)

module.exports = EHR_Physician