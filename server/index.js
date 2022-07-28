import express from 'express';
import connectDB from './connect/connect.js';
import cookieParser from 'cookie-parser';
import cors from "cors";

import authRouter from "./routes/auth.js";
import userRouter from "./routes/user.js";
import videoRouter from "./routes/video.js";
import commentRouter from "./routes/comment.js";

const app = express();




app.use(cors({credentials:true,origin:"http://localhost:3000"}));
app.use(express.json())
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());




app.use("/api/auth",authRouter);
app.use("/api/users",userRouter);
app.use("/api/videos",videoRouter);
app.use("/api/comments",commentRouter);


app.use((err,req,res,next)=>{
  const status=err.status||500;
  const message=err.message||"Something went wrong";
  return res.status(status).json({
    success:false,
    status,
    message
  })
})

const run = () => {
  connectDB('mongodb://localhost:27017/testing')
    .then(() => {
        console.log("conected to db")
      app.listen(8000, console.log('app is listening to the port 8000'));
    })
    .catch((err) => {
      console.log(err);
    });
};

run();


