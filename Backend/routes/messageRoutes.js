const express = require("express");

const {
    sendMessage,
    getMessages
} = require("../controllers/messageController");

const router = express.Router();

// Send a message
router.post("/send", sendMessage);

// Get messages for a learning request
router.get("/:requestId", getMessages);

module.exports = router;