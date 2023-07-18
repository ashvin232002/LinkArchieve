const  User  =  require("../models/User");
const mailSender =  require("../utils/mailSender");
const bcrypt =  require("bcrypt");
const  crypto =  require("crypto");

exports.resetPasswordToken  =  async (req,res)=>{
    try{
         
        const {email} =  req.body;

        const  user  =  await User.findOne({email:email});

        if(!user){
            return res.json({
                success:false,
                message: `This Email: ${email} is not Registered With Us Enter a Valid Email `,
            })
        }

        const token  =  crypto.randomBytes(20).toString("hex");

        const updatedDetails  =  await User.findOneAndUpdate(
            {email:email},
            {
                token:token,
                resetPasswordExpires : Date.now() + 3600000,
            },
            {new:true}
        )

        const  url  =  `http://localhost:3000/update-password/${token}`;

        await mailSender(
            email,
            "Password Reset",
            `Your Link for email verification is ${url}. Please click this url to reset your password.`
        )

        res.json({
            success:true,
            url,
            message:"Email Sent SuccessFully , Please check your Email To continue Further"
        })
    }
    catch(error){
        return res.json({
            error:error.message,
            success:false,
            message: `Some error in the sending the reset pass message`
        })
    }
}

exports.resetPassword   =  async (req,res)=>{
    try{
       const  {password, token} =  req.body;

       if(!password || !token){
        return res.status(400).json({
            success:false,
            message:"Please Enter all The details"
        })
       }

       const  userDetails  =  await User.findOne({token:token});

       if(!userDetails){
        return res.status(400).json({
            success:false,
            message:"Invalid Token "
        })
       }

       if(userDetails.resetPasswordExpires < Date.now()){
        return res.status(400).json({
            success:false,
            message:"Reset Password Time Out Please Try Again Later",
        })
       }

       const hashedPassword =  await bcrypt.hash(password,10);

       await User.findOneAndUpdate(
        {token:token},
        {password:hashedPassword},
        {new:true}
       )

       return res.status(200).json({
        success:true,
        message:"Password Updated SuccessFully",
       })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error While Updating The Password",
        })
    }
}