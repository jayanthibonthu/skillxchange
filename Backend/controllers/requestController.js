const supabase = require("../config/supabase");

// =========================
// SEND LEARNING REQUEST
// =========================
const sendRequest = async (req, res) => {
    try {
        const { sender, receiver, skill } = req.body;

        if (!sender || !receiver || !skill) {
            return res.status(400).json({
                success: false,
                message: "Sender, receiver and skill are required"
            });
        }

        // Check duplicate request
        const { data: existingRequest, error: checkError } = await supabase
            .from("requests")
            .select("*")
            .eq("sender", sender)
            .eq("receiver", receiver)
            .eq("skill", skill)
            .maybeSingle();

        if (checkError) {
            throw checkError;
        }

        if (existingRequest) {
            return res.status(400).json({
                success: false,
                message: "Request already sent"
            });
        }

        // Create request
        const newRequest = {
            sender,
            receiver,
            skill,
            status: "Pending"
        };

        const { data: request, error } = await supabase
            .from("requests")
            .insert([newRequest])
            .select()
            .single();

        if (error) {
            throw error;
        }

        res.status(201).json({
            success: true,
            message: "Learning Request Sent Successfully",
            request
        });

    } catch (error) {
        console.error("Send Request Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// GET ALL REQUESTS
// =========================
const getRequests = async (req, res) => {
    try {
        const { data: requests, error } = await supabase
            .from("requests")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            count: requests.length,
            requests
        });

    } catch (error) {
        console.error("Get Requests Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// GET MENTOR REQUESTS
// =========================
const getMentorRequests = async (req, res) => {
    try {
        const { mentorId } = req.params;

        if (!mentorId) {
            return res.status(400).json({
                success: false,
                message: "Mentor ID is required"
            });
        }

        const { data: requests, error } = await supabase
            .from("requests")
            .select("*")
            .eq("receiver", mentorId)
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        // Get learner name for every request
        const formattedRequests = await Promise.all(
            requests.map(async (request) => {

                const { data: learner, error: learnerError } =
                    await supabase
                        .from("users")
                        .select("name, email")
                        .eq("id", request.sender)
                        .maybeSingle();

                if (learnerError) {
                    console.log(
                        "Learner Fetch Error:",
                        learnerError
                    );
                }

                return {
                    ...request,
                    learnerName: learner?.name || "Unknown Learner",
                    learnerEmail: learner?.email || ""
                };
            })
        );

        res.status(200).json({
            success: true,
            count: formattedRequests.length,
            requests: formattedRequests
        });

    } catch (error) {
        console.error(
            "Get Mentor Requests Error:",
            error
        );

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// GET LEARNER REQUESTS
// =========================
const getLearnerRequests = async (req, res) => {
    try {
        const { learnerId } = req.params;

        if (!learnerId) {
            return res.status(400).json({
                success: false,
                message: "Learner ID is required"
            });
        }

        const { data: requests, error } = await supabase
            .from("requests")
            .select("*")
            .eq("sender", learnerId)
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        // Get mentor details for every request
        const formattedRequests = await Promise.all(
            requests.map(async (request) => {

                const { data: mentor, error: mentorError } = await supabase
                    .from("users")
                    .select("name, email")
                    .eq("id", request.receiver)
                    .maybeSingle();

                if (mentorError) {
                    console.log("Mentor Fetch Error:", mentorError);
                }

                return {
                    ...request,

                    mentorName: mentor?.name || "Unknown Mentor",
                    mentorEmail: mentor?.email || ""
                };
            })
        );

        res.status(200).json({
            success: true,
            count: formattedRequests.length,
            requests: formattedRequests
        });

    } catch (error) {
        console.error("Get Learner Requests Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};
// =========================
// UPDATE REQUEST STATUS
// =========================
const updateRequestStatus = async (req, res) => {
    try {

        // IMPORTANT:
        // route lo :requestId kabatti
        // ikkada requestId use cheyyali
        const { requestId } = req.params;
        const { status } = req.body;

        if (!requestId || !status) {
            return res.status(400).json({
                success: false,
                message: "Request ID and status are required"
            });
        }

        if (
            !["Pending", "Accepted", "Rejected"].includes(status)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid status"
            });
        }

        const { data: request, error } = await supabase
            .from("requests")
            .update({ status })
            .eq("id", requestId)
            .select()
            .single();

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message: `Request ${status}`,
            request
        });

    } catch (error) {
        console.error(
            "Update Request Error:",
            error
        );

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
    sendRequest,
    getRequests,
    getMentorRequests,
    getLearnerRequests,
    updateRequestStatus
};