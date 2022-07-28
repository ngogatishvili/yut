import createError from "../error.js";
import User from "../models/User.js";




export const signup=async(req,res,next)=>{
    try {
    const newUser=new User(req.body);
    await newUser.save();
    return res.status(201).json("user has been created");
    }catch(err) {
        return next(err);
    }
}

export const signin=async(req,res,next)=>{
    try{
    const user=await User.findOne({name:req.body.name});
    if(!user) return next(createError(404,"user not found"));
    const isPasswordCorrect=await user.compare(req.body.password);
    if(!isPasswordCorrect) return next(createError(400,"invalid credentials"));
    const token=await user.createJWT();
    const {password,...others}=user._doc;
    res.cookie("access_token",token)
    .setHeader("Access-Control-Allow-Origin","http://localhost:3000")
    .status(200).json(others);
    }catch(err) {
        return next(err);
    }
}


export const googleAuth=async(req,res,next)=>{
    try{
       const user=await User.findOne({email:req.body.email});
       if(user) {
           const token=await user.createJWT();
           res.cookie("access_token",token).status(200).json(user)
       }else{
          const newUser=new User({...req.body,fromGoogle:true});
          const token=await newUser.createJWT();
          const savedUser=await newUser.save();
          res.cookie("access_token",token).status(200).json(savedUser);
       }
    }catch(err) {
        next(err);
    }
}


