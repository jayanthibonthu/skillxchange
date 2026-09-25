import axios from "axios";

const API_URL =  `${import.meta.env.VITE_API_URL}/api/skills`;

export const addSkill = async (skillData) => {
    const response = await axios.post(API_URL, skillData);
    return response.data;
};

export const getSkills = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};