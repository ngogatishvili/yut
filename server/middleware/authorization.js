import jwt from "jsonwebtoken";
import createError from "../error.js";

const authorization=(req,res,next)=>{
    const token=req.cookies.access_token;
    console.log(token);
    if(!token) return next(createError(401,"no token"))
    jwt.verify(token,"secret",(err,user)=>{
        if(err) {
            return next(createError(403,"token invalid"))
        }else{
            req.user=user;
            next();
        }

        
    })
    

}

export default authorization;


