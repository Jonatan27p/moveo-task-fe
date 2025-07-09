import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const updateCallTag = async (id: number, tagIds: number[]) => {
  try {
    await axios.put(`${API_URL}/callTag/${id}`, { tagIds });
  } catch (error) {
    console.error("Failed to update call tag", error);
  }
};
