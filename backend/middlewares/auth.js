const jwt =  require("jsonwebtoken");
require("dotenv").config();
const User =  require("../models/User");



exports.auth = async (req,res,next)=>{
    try{
        const token = req.cookies.token 
                        || req.body.token 
                        || req.header("Authorization").replace("Bearer ", "");
       
        if(!token){
            return res.status(400).json({
                success:false,
                message:"Not Got any Valid Token",
            })
        }

        try{
            const  decode  =  jwt.verify(token,process.env.SECRET);
            req.user =  decode;
        }
        catch(error){
            return res.status(400).json({
                success:false,
                message:"Token is Invalid"
            })
        }
        next();
    }
    catch(error){
        return res.status(401).json({
            success:false,
            message:"Something went Wrong While validation the token",
        })
    }
}