const jwt=require('jsonwebtoken')

require('dotenv/config')

function verifyToken(req,res,next){
    try {
        const token=req.headers['x-access-token'];
    if (!token){
        return res.status(401).json({
            auth:false,
            message:'No token provide'
        })
    }
    const decoded=jwt.verify(token,process.env.JWT_KEY)
    req.userId=decoded.id;
    next()
    } catch (error) {
        res.json({auth:false,error:error.message})
    }
    
}

module.exports=verifyToken