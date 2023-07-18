const  mongoose  =  require("mongoose");

const  userSchema  = new  mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        required:true,
        type:String,
    },
    password:{
        type:String,
        required:true,
    },
    LinkStored:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"Entry"
        }
    ],
    token:{
        type:String
    },
    resetPasswordExpires:{
        type:Date,
    }
});

module.exports =  mongoose.model("User",userSchema);


