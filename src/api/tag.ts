import axios from "axios";

export interface Tag {
  id: number;
  name: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchTags = async (): Promise<Tag[]> => {
  try {
    const response = await axios.get<Tag[]>(`${API_URL}/tags`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tags:", error);
    return [];
  }
};

export const updateTag = async (id: number, name: string) => {
  try {
    await axios.put<Tag[]>(`${API_URL}/tags/${id}/${name}`);
  } catch (error) {
    console.error("Failed to update tag", error);
  }
};

export const createTag = async (name: string) => {
  try {
    await axios.post<Tag[]>(`${API_URL}/tags/${name}`);
  } catch (error) {
    console.error("Failed to create tag", error);
  }
};
