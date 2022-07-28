import createError from "../error.js";
import Video from "../models/Video.js";
import User from "../models/User.js";




export const addVideo=async(req,res,next)=>{
    try{
    const newVideo=await Video({...req.body,userId:req.user.id});
    await newVideo.save();
    return res.status(200).json(newVideo)
    }catch(err) {
        next(err)
    }
}

export const deleteVideo=async(req,res,next)=>{
    try{
    const video=await Video.findById(req.params.id);
    if(!video) return next(createError(404,"video not found"));
    if(req.user.id===video.userId) {
            await Video.findByIdAndDelete(video._id);
            return res.status(200).json("the video has been deleted")
    }else{
        return next(createError(403,"you can delete only your own videos"))
    }

    }catch(err) {
        next(err);
    }
}


export const getVideo=async(req,res,next)=>{
        try{
        const video=await Video.findById(req.params.id);
        if(!video) return next(createError(404,"video not found"));
        return res.status(200).json(video);
        }catch(err) {
            next(err);
        }
}

export const updateVideo=async(req,res,next)=>{
    try{
        const video=await Video.findById(req.params.id);
        if(!video) return next(createError(404,"video not found"));
        if(req.user.id===video.userId) {
            const updatedVideo=await Video.findByIdAndUpdate(video._id,{
                $set:req.body,
                
            },
            {new:true})
            return res.status(200).json(updatedVideo);
        }else{
            return next(createError(403,"you can only update your own videos"))
        }
    }catch(err) {
        next(err);
    }
}


export const addView=async(req,res,next)=>{
    try{
    const video=await Video.findById(req.params.id);
    if(!video) return next(createError(404,"video not found"));
    const  updatedVideo=await Video.findByIdAndUpdate(video._id,{
        $inc:{views:1},
        
    },
    {new:true})
    return res.status(200).json(updatedVideo);
    }catch(err) {
        return next(err);
    }
}


export const random=async(req,res,next)=>{
        try{
        const videos=await Video.aggregate([{$sample:{size:40}}]);
        return res.status(200).json(videos);
        }catch(err) {
            next(err);
        }
}

export const trend=async(req,res,next)=>{
    try{
    const videos=await Video.find({}).sort({views:-1});
    return res.status(200).json(videos);
    }catch(err) {
        next(err);
    }
}


export const subscribed=async(req,res,next)=>{
    try{
        const user=await User.findById(req.user.id);
        const videos=await Promise.all(user.subscribedUsers.map(channelId=>{
            return Video.find({userId:channelId});
        }))
        return res.status(200).json(videos.flat().sort((a,b)=>b.createdAt-a.createdAt));
    }catch(err) {
        next(err);
    }
}

export const getByTags=async(req,res,next)=>{
    try{
    const tags=req.query.tags;
    const videos=await Video.find({tags:{$in:tags.split(",")}})
    res.status(200).json(videos);
    }catch(err) {
        next(err)
    }
}

export const getBySearch=async(req,res,next)=>{
    try{
    const query=req.query.query;
    const videos=await Video.find({title:{$regex:query,$options:"i"}});
    res.status(200).json(videos);
    }catch(err) {
        next(err);
    }
}


