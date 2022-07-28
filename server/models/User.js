import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const UserSchema=new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String
    },
    img:{
        type:String
    },
    subscribedUsers:{
        type:[String],
        default:[]
    },
    subscribers:{
        type:Number,
        default:0
    },
    fromGoogle:{
        type:Boolean,
        default:false
    }

},
{timestamps:true})


UserSchema.pre("save",function() {
    const salt=bcrypt.genSaltSync(10);
    this.password=bcrypt.hashSync(this.password,salt);
})

UserSchema.methods.compare=function(candidatePassword) {
    const isPasswordCorrect=bcrypt.compareSync(candidatePassword,this.password);
    return isPasswordCorrect;
}

UserSchema.methods.createJWT=function() {
    return jwt.sign({id:this._id},"secret",{expiresIn:"30d"});
}

export default mongoose.model("User",UserSchema);


