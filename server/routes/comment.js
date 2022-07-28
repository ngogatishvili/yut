import express from "express";
import { addComment ,deleteComment, getComments} from "../controllers/comment.js";
import authorization from "../middleware/authorization.js";

const router=express.Router();


router.post("/:id",authorization,addComment);
router.delete("/:id",authorization,deleteComment);
router.get("/:videoId",getComments);

export default router;

