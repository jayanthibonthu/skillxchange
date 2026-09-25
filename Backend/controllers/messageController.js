const supabase = require("../config/supabase");

// =========================
// SEND MESSAGE
// =========================
const sendMessage = async (req, res) => {
    try {
        const {
            requestId,
            sender,
            receiver,
            message
        } = req.body;

        if (!requestId || !sender || !receiver || !message) {
            return res.status(400).json({
                success: false,
                message: "Request ID, sender, receiver and message are required"
            });
        }

        // Check whether the learning request exists
        const { data: request, error: requestError } = await supabase
            .from("requests")
            .select("id, sender, receiver, status")
            .eq("id", requestId)
            .maybeSingle();

        if (requestError) {
            throw requestError;
        }

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Learning request not found"
            });
        }

        // Chat is allowed only after mentor accepts
        if (request.status !== "Accepted") {
            return res.status(403).json({
                success: false,
                message: "Chat is available only for accepted requests"
            });
        }

        // Make sure sender and receiver belong to this request
        if (
            !(
                (request.sender === sender && request.receiver === receiver) ||
                (request.sender === receiver && request.receiver === sender)
            )
        ) {
            return res.status(403).json({
                success: false,
                message: "You are not part of this learning request"
            });
        }

        const newMessage = {
            request_id: requestId,
            sender,
            receiver,
            message: message.trim()
        };

        const { data, error } = await supabase
            .from("messages")
            .insert([newMessage])
            .select()
            .single();

        if (error) {
            throw error;
        }

        res.status(201).json({
            success: true,
            message: "Message sent successfully",
            data
        });

    } catch (error) {
        console.error("Send Message Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// GET MESSAGES
// =========================
const getMessages = async (req, res) => {
    try {
        const { requestId } = req.params;

        if (!requestId) {
            return res.status(400).json({
                success: false,
                message: "Request ID is required"
            });
        }

        // Check request
        const { data: request, error: requestError } = await supabase
            .from("requests")
            .select("id, sender, receiver, status")
            .eq("id", requestId)
            .maybeSingle();

        if (requestError) {
            throw requestError;
        }

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Learning request not found"
            });
        }

        if (request.status !== "Accepted") {
            return res.status(403).json({
                success: false,
                message: "Chat is available only for accepted requests"
            });
        }

        const { data: messages, error } = await supabase
            .from("messages")
            .select("*")
            .eq("request_id", requestId)
            .order("created_at", { ascending: true });

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            messages
        });

    } catch (error) {
        console.error("Get Messages Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// EXPORT
// =========================
module.exports = {
    sendMessage,
    getMessages
};