const User = require('../Model/User')
const userSchema= require('../Model/User')
const jwt=require('jsonwebtoken')

require('dotenv/config')

const addUser = async (req,res)=>{
    try {
        const userFind = await  User.findOne({user:req.body.user})
        console.log(userFind)
        if (userFind!=null){
            res.json({message: 'Existing user'}).status(401)
        }else{
        const userNew = new User({
            user:req.body.user,
            name:req.body.name,
            password:req.body.password,
            rol:req.body.rol
        })
        userNew.password = await userNew.encryptPassword(userNew.password)
        const userSaved = await userNew.save()
        res.json(userSaved).status(201)
    }
    } catch (error) {
        res.json({error:error.message})
    }
   
}



const login= async (req,res)=>{
    const userSearch = {
        user:req.body.user,
        password:req.body.password
    }
    const userFind = await User.findOne({user : userSearch.user})
    
    if(!userFind){
        return res.json({auth:false,message:'The user doesnt exists'}).status(401)
    }

    const passAuth=await userFind.validatePassword(userSearch.password);
    if (!passAuth){
        return res.json({auth:false,token:null}).status(401)
    }

    const token = jwt.sign({id:userFind._id},process.env.JWT_KEY)

    const user = {
        id:userFind._id,
        name:userFind.name,
        user:userFind.user,
        rol:userFind.rol
    }

    return res.json({auth:true,token,user})
}

module.exports = {addUser,login}