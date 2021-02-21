const mongoose = require('mongoose')
const bcrypt=require('bcrypt');
const saltRounds=10;


const userSchema = mongoose.Schema({
    user:{
        type:String
    },
    name:{
        type: String
    },
    password:{
        type:String
    },
    rol:{
        type:String
    }
})

userSchema.methods.encryptPassword= async (password)=>{
    const salt=await bcrypt.genSalt(10);
    return bcrypt.hash(password,salt);
};

userSchema.methods.validatePassword=function(password){
    return bcrypt.compare(password,this.password);
}

module.exports = mongoose.model('user',userSchema)