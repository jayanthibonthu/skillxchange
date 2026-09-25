const express = require("express");

const router = express.Router();

const {
    uploadCertificate,
    getCertificates
} = require("../controllers/certificateController");

// Upload Certificate
router.post("/upload", uploadCertificate);

// Get All Certificates
router.get("/", getCertificates);

module.exports = router;