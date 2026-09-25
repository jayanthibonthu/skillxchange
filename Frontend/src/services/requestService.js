import axios from "axios";

const API_URL =  `${import.meta.env.VITE_API_URL}/api/requests`;

// Send request
export const sendRequest = async (requestData) => {
    const response = await axios.post(
        `${API_URL}/send`,
        requestData
    );

    return response.data;
};

// Get mentor requests
export const getMentorRequests = async (mentorId) => {
    const response = await axios.get(
        `${API_URL}/mentor/${mentorId}`
    );

    return response.data;
};

// Update request status
export const updateRequestStatus = async (requestId, status) => {
    const response = await axios.put(
        `${API_URL}/${requestId}/status`,
        { status }
    );

    return response.data;
};