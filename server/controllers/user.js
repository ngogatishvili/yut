import createError from "../error.js";
import User from "../models/User.js";
import Video from "../models/Video.js";

export const updateUser=async(req,res,next)=>{
    try{
    
    if(req.params.id===req.user.id) {
        const user=await User.findByIdAndUpdate(req.params.id,{
            $set:req.body
        },
        {new:true})
        return res.status(200).json(user);
    }else{
        return next(createError(403,"you can update only your account"))
    }
    }catch(err) {
        next(err);
    }
}


export const deleteUser=async(req,res,next)=>{
    try{
    if(req.params.id===req.user.id) {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json("the user has been deleted")
    }else{
        return next(createError(403,"you can delete only your account"))
    }
    
    }catch(err) {
        next(err);
    }
}


export const getUser=async(req,res,next)=>{
    try{
    const user=await User.findById(req.params.id);
    if(!user) return next(404,"user is not found with this id")
    return res.status(200).json(user)
    }catch(err){
        next(err)
    }
}

export const subscribeUser=async(req,res,next)=>{
    try{
    console.log(req.user.id)
    await User.findByIdAndUpdate(req.user.id,{
        $addToSet:{subscribedUsers:req.params.id}
    })
    await User.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:1}
    })
    res.status(200).json("subscription succesfull")
    }catch(err) {
        next(err);
    }
}



export const unsubscribeUser=async(req,res,next)=>{
    try{
    await User.findByIdAndUpdate(req.user.id,{
        $pull:{subscribedUsers:req.params.id}
    })
    await User.findByIdAndUpdate(req.params.id,{
        $inc:{subscribers:-1}
    })
    return res.status(200).json("unsubscription succesfull")
    }catch(err) {
        next(err);
    }
}

// like and dislike

export const likeVideo=async(req,res,next)=>{
    try{
    await Video.findByIdAndUpdate(req.params.videoId,{
        $addToSet:{likes:req.user.id},
        $pull:{dislikes:req.user.id}
    })
    res.status(200).json("video has been liked")
    }catch(err) {
        next(err);
    }
}

export const unlikeVideo=async(req,res,next)=>{
    try{
    await Video.findByIdAndUpdate(req.params.videoId,{
        $addToSet:{dislikes:req.user.id},
        $pull:{likes:req.user.id}
    })
    res.status(200).json("video has been unliked")
    }catch(err) {
        next(err);
    }
}