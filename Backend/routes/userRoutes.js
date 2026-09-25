const express = require("express");

const router = express.Router();

const {
    updateProfile
} = require("../controllers/userController");

// Update user profile
router.put("/:id", updateProfile);

module.exports = router;