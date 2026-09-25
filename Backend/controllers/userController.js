const supabase = require("../config/supabase");

// =========================
// UPDATE USER PROFILE
// =========================
const updateProfile = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, email } = req.body;

        if (!id) {
            return res.status(400).json({
                success: false,
                message: "User ID is required"
            });
        }

        if (!name || !email) {
            return res.status(400).json({
                success: false,
                message: "Name and email are required"
            });
        }

        const { data: user, error } = await supabase
            .from("users")
            .update({
                name: name,
                email: email
            })
            .eq("id", id)
            .select("id, name, email, role")
            .single();

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Profile updated successfully",
            user
        });

    } catch (error) {
        console.error("Update Profile Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    updateProfile
};