import axios from "axios";

const API_URL = "http://localhost:5000/api/skills";

export const addSkill = async (skillData) => {
    const response = await axios.post(API_URL, skillData);
    return response.data;
};

export const getSkills = async () => {
    const response = await axios.get(API_URL);
    return response.data;
};