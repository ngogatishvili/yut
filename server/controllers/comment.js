import createError from "../error.js";
import Comment from "../models/Comment.js";
import Video from "../models/Video.js";

export const addComment=async(req,res,next)=>{
    try{
        const newComment=await new Comment({...req.body, userId:req.user.id,videoId:req.params.id});
        await newComment.save();
        return res.status(201).json("comment has been added")
    }catch(err) {
        next(err);
    }
}

export const deleteComment=async(req,res,next)=>{
    try{
    const comment=await Comment.findById(req.params.id);
    const video=await Video.findById(comment.videoId);
    if(req.user.id===comment.userId||req.user.id===video.userId) {
        await Comment.findByIdAndDelete(req.params.id)
        return res.status(200).json("comment has been deleted")
    }else{
        return next(createError(403,"you can delete comment if you are owner of te comment or the video"));
    }
    }catch(err) {
        next(err);
    }
}
  

export const getComments=async(req,res,next)=>{
    try{
        const comments=await Comment.find({videoId:req.params.videoId});
        res.status(200).json(comments);
    }catch(err) {
        next(err)
    }
}   