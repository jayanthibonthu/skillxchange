const supabase = require("../config/supabase");

// =========================
// ADD RESOURCE
// =========================
const addResource = async (req, res) => {
    try {
        const {
            title,
            description,
            link,
            uploadedBy
        } = req.body;

        if (!title || !description) {
            return res.status(400).json({
                success: false,
                message: "Title and description are required"
            });
        }

        const resourceData = {
            title,
            description,
            link: link || "",
            uploaded_by: uploadedBy || null
        };

        const { data: resource, error } = await supabase
            .from("resources")
            .insert([resourceData])
            .select()
            .single();

        if (error) {
            throw error;
        }

        res.status(201).json({
            success: true,
            message: "Resource added successfully",
            resource: {
                id: resource.id,
                title: resource.title,
                description: resource.description,
                link: resource.link,
                uploadedBy: resource.uploaded_by
            }
        });

    } catch (error) {
        console.error("Add Resource Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// GET ALL RESOURCES
// =========================
const getResources = async (req, res) => {
    try {
        const { data: resources, error } = await supabase
            .from("resources")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            throw error;
        }

        const formattedResources = resources.map((resource) => ({
            id: resource.id,
            title: resource.title,
            description: resource.description,
            link: resource.link,
            uploadedBy: resource.uploaded_by
        }));

        res.status(200).json({
            success: true,
            count: formattedResources.length,
            resources: formattedResources
        });

    } catch (error) {
        console.error("Get Resources Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


// =========================
// ADD MENTOR VIDEO (mp4 / mkv only)
// =========================
const addVideoResource = async (req, res) => {
    try {
        // multer puts the uploaded file info in req.file
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No video file uploaded. Only MP4 and MKV files are allowed."
            });
        }

        const { title, description, uploadedBy } = req.body;

        if (!title) {
            return res.status(400).json({
                success: false,
                message: "Title is required"
            });
        }

        // Public URL for the uploaded video (server.js serves /uploads statically)
        const videoLink = `/uploads/videos/${req.file.filename}`;

        const resourceData = {
            title,
            description: description || "",
            link: videoLink,
            uploaded_by: uploadedBy || null
        };

        const { data: resource, error } = await supabase
            .from("resources")
            .insert([resourceData])
            .select()
            .single();

        if (error) {
            throw error;
        }

        res.status(201).json({
            success: true,
            message: "Video uploaded successfully",
            resource: {
                id: resource.id,
                title: resource.title,
                description: resource.description,
                link: resource.link,
                uploadedBy: resource.uploaded_by
            }
        });

    } catch (error) {
        console.error("Add Video Resource Error:", error);

        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};


module.exports = {
    addResource,
    getResources,
    addVideoResource
};