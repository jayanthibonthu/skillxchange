import axios from "axios";

const API_URL = "http://localhost:5000/api/resources";

export const addResource = async (resourceData) => {
    const response = await axios.post(
        API_URL,
        resourceData
    );
    return response.data;
};

export const getResources = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};

// =========================
// UPLOAD MENTOR VIDEO (MP4 / MKV only)
// =========================
export const uploadMentorVideo = async ({ title, description, uploadedBy, videoFile }) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description || "");
    formData.append("uploadedBy", uploadedBy || "");
    formData.append("video", videoFile);

    const response = await axios.post(
        `${API_URL}/video`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};