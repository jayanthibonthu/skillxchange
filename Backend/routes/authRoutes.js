const express = require("express");
const router = express.Router();

const {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
} = require("../controllers/authController");

const { protect } = require("../middleware/authMiddleware");


// =========================
// AUTH ROUTES
// =========================

// Register
router.post("/register", registerUser);

// Login
router.post("/login", loginUser);


// =========================
// PROFILE ROUTES
// =========================

// Get Profile
router.get("/profile", protect, getProfile);

// Update Profile
router.put("/profile", protect, updateProfile);


module.exports = router;
