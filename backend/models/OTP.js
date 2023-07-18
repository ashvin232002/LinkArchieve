const  mongoose  =  require("mongoose");
const mailSender = require("../utils/mailSender");
const  emailTemplate =  require("../mail/emailVerificationTemplate");
const  OTPSchema =  new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp :{
        type:String,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
        expires: 60*5,
    }
});


//a function -> To send mail

async function  SendVerificationEmail(email,otp){
    try{
        const  mailResponse  =  await mailSender(email,"Verification Email from Link Store",emailTemplate(otp));
        console.log("Mail Sent SuccessFully",mailResponse.response);
    }
    catch(error){
        console.log("error Occurred While Sending The mail",error);
        throw error;
    }
}

OTPSchema.pre("save", async function(next){
      console.log("New Document Saved To The database")
      if(this.isNew){
        await SendVerificationEmail(this.email,this.otp);
      }
      next();
})

module.exports=  mongoose.model("OTP",OTPSchema);