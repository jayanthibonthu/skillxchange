const jwt = require("jsonwebtoken");
const supabase = require("../config/supabase");

const JWT_SECRET = process.env.JWT_SECRET || "skill_exchange_secret";

// Generate JWT Token
const generateToken = (id) => {
    return jwt.sign(
        { id },
        JWT_SECRET,
        { expiresIn: "30d" }
    );
};


// =========================
// REGISTER USER
// =========================
const registerUser = async (req, res) => {
    try {
        const { name, email, password, role } = req.body;

        // Check existing user
        const { data: existingUser, error: checkError } = await supabase
            .from("users")
            .select("id")
            .eq("email", email)
            .maybeSingle();

        if (checkError) {
            throw checkError;
        }

        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User already exists",
            });
        }

        // Create user
        const newUser = {
            name,
            email,
            password,
            role: role || "learner",
            education: "",
            bio: "",
            skills_offered: [],
            skills_wanted: [],
            certificates: [],
        };

        const { data: user, error } = await supabase
            .from("users")
            .insert([newUser])
            .select()
            .single();

        if (error) {
            throw error;
        }

        const token = generateToken(user.id);

        res.status(201).json({
            success: true,
            message: "User Registered Successfully",
            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                education: user.education,
                bio: user.bio,
                skillsOffered: user.skills_offered || [],
                skillsWanted: user.skills_wanted || [],
                certificates: user.certificates || [],
            },
        });

    } catch (error) {
        console.error("Register Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =========================
// LOGIN USER
// =========================
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("email", email)
            .eq("password", password)
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const token = generateToken(user.id);

        res.status(200).json({
            success: true,
            message: "Login Successful",
            token,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                education: user.education,
                bio: user.bio,
                skillsOffered: user.skills_offered || [],
                skillsWanted: user.skills_wanted || [],
                certificates: user.certificates || [],
            },
        });

    } catch (error) {
        console.error("Login Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =========================
// GET PROFILE
// =========================
const getProfile = async (req, res) => {
    try {
        const { data: user, error } = await supabase
            .from("users")
            .select("*")
            .eq("id", req.user.id)
            .maybeSingle();

        if (error) {
            throw error;
        }

        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        res.status(200).json({
            success: true,

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                education: user.education,
                bio: user.bio,
                skillsOffered: user.skills_offered || [],
                skillsWanted: user.skills_wanted || [],
                certificates: user.certificates || [],
            },
        });

    } catch (error) {
        console.error("Get Profile Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


// =========================
// UPDATE PROFILE
// =========================
const updateProfile = async (req, res) => {
    try {
        const {
            name,
            education,
            bio,
            skillsOffered,
            skillsWanted,
            certificates,
        } = req.body;

        const updates = {};

        if (name !== undefined) {
            updates.name = name;
        }

        if (education !== undefined) {
            updates.education = education;
        }

        if (bio !== undefined) {
            updates.bio = bio;
        }

        if (skillsOffered !== undefined) {
            updates.skills_offered = skillsOffered;
        }

        if (skillsWanted !== undefined) {
            updates.skills_wanted = skillsWanted;
        }

        if (certificates !== undefined) {
            updates.certificates = certificates;
        }

        const { data: user, error } = await supabase
            .from("users")
            .update(updates)
            .eq("id", req.user.id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Profile Updated Successfully",

            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                education: user.education,
                bio: user.bio,
                skillsOffered: user.skills_offered || [],
                skillsWanted: user.skills_wanted || [],
                certificates: user.certificates || [],
            },
        });

    } catch (error) {
        console.error("Update Profile Error:", error);

        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    getProfile,
    updateProfile,
};