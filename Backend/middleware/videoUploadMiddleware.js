const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Make sure the destination folder exists
const videoFolder = path.join(__dirname, "..", "uploads", "videos");
if (!fs.existsSync(videoFolder)) {
  fs.mkdirSync(videoFolder, { recursive: true });
}

// Storage Configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoFolder);
  },

  filename: (req, file, cb) => {
    cb(
      null,
      Date.now() + "-" + Math.round(Math.random() * 1e9) + path.extname(file.originalname)
    );
  },
});

// Only allow .mp4 and .mkv files
const allowedExtensions = /\.(mp4|mkv)$/i;
const allowedMimeTypes = [
  "video/mp4",
  "video/x-matroska", // .mkv
  "application/octet-stream", // some browsers send this for .mkv - checked together with extension below
];

const fileFilter = (req, file, cb) => {
  const extname = allowedExtensions.test(
    path.extname(file.originalname).toLowerCase()
  );

  const mimetype = allowedMimeTypes.includes(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only MP4 and MKV video files are allowed"));
  }
};

const uploadVideo = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 500 * 1024 * 1024, // 500 MB - adjust as needed for your videos
  },
});

module.exports = uploadVideo;
