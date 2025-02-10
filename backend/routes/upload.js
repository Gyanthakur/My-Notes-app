import { Router } from "express";
import upload from "../middleware/multer.js";
const router = Router();

router.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded!" });
    // console.log( req.file.path )
  res.json({ fileUrl: req.file.path }); // Cloudinary URL
});

export default router;