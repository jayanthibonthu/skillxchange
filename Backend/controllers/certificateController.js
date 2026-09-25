const supabase = require("../config/supabase");

// =========================
// UPLOAD CERTIFICATE
// =========================
const uploadCertificate = async (req, res) => {
    try {
        const {
            userId,
            title,
            issuer,
            issueDate,
            certificateUrl
        } = req.body;

        if (!userId || !title) {
            return res.status(400).json({
                success: false,
                message: "User ID and certificate title are required"
            });
        }

        const certificateData = {
            user_id: userId,
            title,
            issuer: issuer || "",
            issue_date: issueDate || null,
            certificate_url: certificateUrl || ""
        };

        const { data: certificate, error } = await supabase
            .from("certificates")
            .insert([certificateData])
            .select()
            .single();

        if (error) {
            throw error;
        }

        res.status(201).json({
            success: true,
            message: "Certificate uploaded successfully",
            certificate
        });

    } catch (error) {
        console.error("Upload Certificate Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// GET CERTIFICATES
// =========================
const getCertificates = async (req, res) => {
    try {
        const { data: certificates, error } = await supabase
            .from("certificates")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            count: certificates.length,
            certificates
        });

    } catch (error) {
        console.error("Get Certificates Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    uploadCertificate,
    getCertificates
};