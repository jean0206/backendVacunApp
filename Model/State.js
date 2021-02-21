const mongoose = require('mongoose')

const stateSchema = mongoose.Schema({
    nameState:{
        type:String
    },
    vaccinated:{
        type: Number
    },
    population:{
        type:Number
    },
    percentage:{
        type:Number
    }
})

module.exports = mongoose.model('state',stateSchema)