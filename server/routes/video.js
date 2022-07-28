import express from "express";
import { addVideo, addView, deleteVideo, getBySearch, getByTags, getVideo, random, subscribed, trend, updateVideo } from "../controllers/video.js";
import authorization from "../middleware/authorization.js";


const router=express.Router();


// addVideo

router.post("/add",authorization,addVideo);


// deletevideo

router.delete("/delete/:id",authorization,deleteVideo)

// getvideo

router.get("/find/:id",getVideo);

// updateVideo

router.put("/update/:id",authorization,updateVideo)

// addview

router.put("/view/:id",addView);

// getTrended

router.get("/trend",trend);

// getRandom

router.get("/random",random);


// getsub

router.get("/sub",authorization,subscribed);


// search

router.get("/search",getBySearch);


// tags

router.get("/tags",getByTags);









export default router;