const express = require("express");

const router = express.Router();

const {
    sendRequest,
    getRequests,
    getMentorRequests,
    getLearnerRequests,
    updateRequestStatus
} = require("../controllers/requestController");

// =========================
// SEND LEARNING REQUEST
// =========================
router.post("/send", sendRequest);

// =========================
// GET ALL REQUESTS
// =========================
router.get("/", getRequests);

// =========================
// GET MENTOR REQUESTS
// =========================
router.get("/mentor/:mentorId", getMentorRequests);

// =========================
// GET LEARNER REQUESTS
// =========================
router.get("/learner/:learnerId", getLearnerRequests);

// =========================
// UPDATE REQUEST STATUS
// =========================
router.put("/:requestId/status", updateRequestStatus);

module.exports = router;