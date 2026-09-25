const express = require("express");
const multer = require("multer");

const router = express.Router();

const {
    addResource,
    getResources,
    addVideoResource
} = require("../controllers/resourceController");

const uploadVideo = require("../middleware/videoUploadMiddleware");

router.post("/", addResource);

router.get("/", getResources);

// =========================
// MENTOR VIDEO UPLOAD (MP4 / MKV only)
// =========================
router.post("/video", (req, res, next) => {
    uploadVideo.single("video")(req, res, (err) => {
        if (err instanceof multer.MulterError) {
            // e.g. file too large
            return res.status(400).json({
                success: false,
                message: `Upload error: ${err.message}`
            });
        } else if (err) {
            // Thrown from our fileFilter (wrong file type)
            return res.status(400).json({
                success: false,
                message: err.message
            });
        }
        next();
    });
}, addVideoResource);

module.exports = router;