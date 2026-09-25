const supabase = require("../config/supabase");

// =========================
// ADD SKILL
// =========================
const addSkill = async (req, res) => {
    try {
        const {
            title,
            category,
            description,
            level,
            duration,
            mentorId,
            mentorName
        } = req.body;

        // Check mentor ID
        if (!mentorId) {
            return res.status(400).json({
                success: false,
                message: "Mentor ID is missing"
            });
        }

        // Data to save in Supabase
        const skillData = {
            title: title,
            category: category,
            description: description,
            level: level,
            duration: duration,
            mentor_id: mentorId,
            mentor_name: mentorName || "Unknown Mentor"
        };

        console.log("Saving Skill:", skillData);

        const { data: skill, error } = await supabase
            .from("skills")
            .insert([skillData])
            .select()
            .single();

        if (error) {
            console.error("Supabase Error:", error);
            throw error;
        }

        res.status(201).json({
            success: true,
            message: "Skill Added Successfully",
            skill: {
                id: skill.id,
                title: skill.title,
                category: skill.category,
                description: skill.description,
                level: skill.level,
                duration: skill.duration,
                mentor: skill.mentor_id,
                mentorName: skill.mentor_name
            }
        });

    } catch (error) {
        console.error("Add Skill Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// GET ALL SKILLS
// =========================
const getSkills = async (req, res) => {
    try {

        const { data: skills, error } = await supabase
            .from("skills")
            .select("*")
            .order("created_at", {
                ascending: false
            });

        if (error) {
            console.error("Supabase Error:", error);
            throw error;
        }

        const formattedSkills = skills.map((skill) => ({
            id: skill.id,
            title: skill.title,
            category: skill.category,
            description: skill.description,
            level: skill.level,
            duration: skill.duration,

            // Mentor details
            mentor: skill.mentor_id,
            mentorName: skill.mentor_name
        }));

        res.status(200).json({
            success: true,
            count: formattedSkills.length,
            skills: formattedSkills
        });

    } catch (error) {
        console.error("Get Skills Error:", error);

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
    addSkill,
    getSkills
};