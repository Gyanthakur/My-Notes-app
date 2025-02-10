import express from "express";
import {verifyToken} from "../utils/verifyUser.js"
import { addNote ,deleteNote,editNote,getAllNotes, searchNote, updateNotePinned} from "../controller/noteController.js";
// import { addNote } from "../controller/noteController.js";

import multer from "multer";
// // import upload from "../middleware/multer.js";
// import upload from "../middleware/upload.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/"); // Temp storage folder
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

// Multer upload middleware
const upload = multer({ storage });


const router = express.Router();

router.post("/add", upload.single("file"), addNote );
router.post("/edit/:noteId",verifyToken,editNote)
router.get("/all",verifyToken,getAllNotes)
router.delete("/delete/:noteId",verifyToken,deleteNote)
router.put("/update-note-pinned/:noteId",verifyToken,updateNotePinned)
router.get("/search",verifyToken,searchNote)


export default router