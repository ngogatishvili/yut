import express from "express";
import { deleteUser, getUser, likeVideo, subscribeUser, unlikeVideo, unsubscribeUser, updateUser } from "../controllers/user.js";
import authorization from "../middleware/authorization.js";
const router=express.Router();




// update user

router.put("/:id",authorization,updateUser)

// delete user
router.delete("/:id",authorization,deleteUser)

// get user
router.get("/find/:id",getUser)


// subscribe user

router.put("/subscribe/:id",authorization,subscribeUser)

// unsubscribe

router.put("/unsubscribe/:id",authorization,unsubscribeUser)

// likevideo
router.put("/like/:videoId",authorization,likeVideo)

// unlike video

router.put("/unlike/:videoId",authorization,unlikeVideo)


export default router;


