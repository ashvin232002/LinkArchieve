const mongoose  =  require("mongoose");
// const  uniqueValidator  =  require("mongoose-unique-validator");

const entrySchema  =  new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:40,
        trim:true,
    },
    link:{
        type:String,
        required:true,
        trim:true,
    },
    description:{
        type:String,
        required:true,
        maxlength:250,
        trim:true,
    },
    type:{
        type:String,
        required:true,
    },
    tags:[String],
    isStarred:{
       type:Boolean,
       default:false,
    },
    isViewed:{
        type:Boolean,
        default:false,
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})


module.exports =  mongoose.model("Entry",entrySchema);