const Entry  =  require("../models/Entry");
const  User  =  require("../models/User");


exports.createEntry  =  async (req,res)=>{
    try{
        const {title, link ,  description ,type, tags } =  req.body;
       
        if(!title || !link || !description || !type || !tags){
            return res.status(400).json({
                success:false,
                message:"Please Enter The all Details"
            })
        }


        const user  =  await User.findOne({_id:req.user.id});

        
        if(!user){
            return res.status(400).json({
                success:false,
                message:"User NOt Found",
            })
        }

        const saveEntry =  await Entry.create({
            title,
            link,
            description,
            type,
            tags,
            user:req.user.id,
        })

        console.log("I am Printing THe final Entry",saveEntry);

        await User.findByIdAndUpdate({_id:req.user.id},
                                     {
                                         $push:{
                                            LinkStored:saveEntry._id,
                                         }
                                     },
                                     {new:true});

       
       return res.status(200).json({
        success:true,
        message:"Entry Created SuccessFully",
       })
        
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error While Creating The Entry"
        })
    }
}


exports.deleteEntry  =  async (req,res)=>{
    try{
         
        const {id:entryId} =  req.params;
        
        if(!entryId){
            return res.status(400).json({
                success:false,
                message:"Entry Id Not Proper",
            })
        }

        const  entry  =  await Entry.findById({_id:entryId});
        console.log("PRINTING THE ENTRY",entry);
        if(!entry){
            return res.status(400).json({
                success:false,
                message:"Entry Not Found",
            })
        }

        console.log("userid",req.user.id);
        await User.findByIdAndUpdate(
            {_id:req.user.id},
            {
                $pull:{
                    LinkStored:entryId
                }
            },
            {new:true},
        )
         console.log("BEFORE DELETING");
        await Entry.findByIdAndDelete({_id:entryId});


        //const  data =  await Entry.find({user:req.user.id});
        return res.status(200).json({
            success:true,
            message:"Entry Delted SuccessFully",
            //data,
        })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error while Deleting The Entry"
        })
    }
}

exports.getAllEntries  =  async (req,res)=>{
    try{
         
        const  userId  =  req.user.id;

        if(!userId){
            return res.status(400).json({
                success:false,
                message:"UserId Not Found"
            })
        }

        const entries =  await Entry.find({user:userId}).sort({createdAt:-1});


        return res.status(200).json({
            success:true,
            message:"Entries Got SuccessFully",
            entries,
        })
    }
    catch(error){
        return res.status(400).json({
            success:true,
            message:"Error While Getting all The Entries",
        })
    }
}



exports.updateEntry  =  async (req,res)=>{
    try{
        const {id:entryId} =  req.params;

        if(!entryId){
            return res.status(400).json({
                success:false,
                message:"Entry Id nOT found",
            })
        }
        const {title, link ,  description ,type, tags } =  req.body;
        if(!title || !link || !description || !type || !tags){
            return res.status(400).json({
                success:false,
                message:"Please Fill all The details",
            })
        }

        const  entry  =  await Entry.findById({_id:entryId});
        console.log("Printing The Entry",entry);
        if(!entry){
            return res.status(400).json({
                success:false,
                message:"Entry Not Found",
            })
        }

        Entry.findByIdAndUpdate({id:entryId},
                                  {
                                    link,
                                    title,
                                    description,
                                    type,
                                    tags
                                  },
                                  {new:true});

    
        
        return res.status(200).json({
            success:true,
            message:"Entry Updated SuccessFully",
            // data
        })
        
        
    }
    catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Error While Updating The Entries",
        })
    }
}



exports.startEntry =  async (req,res)=>{
    try{
           const  {id:entryId} =  req.params;

           const  entry  =  await Entry.findById({_id:entryId});

            if(!entry){
                return res.status(400).json({
                    success:false,
                    message:"Entry Not Found",
                })
            }

            entry.isStarred  = !entry.isStarred;

            await Entry.findByIdAndUpdate({_id:entryId},
                                           entry,
                                           {new:true});

            const data =  await Entry.find({user:req.user.id});
            console.log("PRINTING THE DATA FULL ENTRY",data);
            return res.status(200).json({
                success:true,
                message:"Entry Starred SuccessFully",
                data:data
            })
    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error While Staring The Entry"
        })
    }
}

exports.markEntryAsViewed =  async (req,res)=>{
    try{
        const {id:entryId} =  req.params ;

        const entry   =  await Entry.findById({_id:entryId});

        if(!entry){
            return res.status(400).json({
                success:false,
                message:"Entry Not Found Which You want to mark as Viewed",
            })
        }

        entry.isViewed =  !entry.isViewed;

        const entrydata = await Entry.findByIdAndUpdate({_id:entryId},
                                      entry,
                                      {new:true});

        console.log("PRINTING",entrydata);
        const data =  await Entry.find({user:req.user.id});

        return res.status(200).json({
            success:true,
            message:"Entry Marked as Viewed SucccessFully",
            data:data,
        })
       

    }
    catch(error){
        return res.status(400).json({
            success:false,
            message:"Error while marking the entry as Viewed"
        })
    }
}




