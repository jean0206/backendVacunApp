const mongoose = require('mongoose')

const vaccines = new mongoose.Schema({
    name:{
        type:String
    },
    description:{
        type:String
    },
    dose:{
        type: Number
    },
    origin:{
        type: String
    },
    amount:{
        type:Number
    }
})

module.exports = mongoose.model('vaccine',vaccines)