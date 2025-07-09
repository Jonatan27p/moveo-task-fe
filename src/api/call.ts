import axios from "axios";
import type { Tag } from "./tag";

export interface Call {
  id: number;
  name: string;
  Tags: Tag[];
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchCalls = async (): Promise<Call[]> => {
  try {
    const response = await axios.get<Call[]>(`${API_URL}/calls`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch calls:", error);
    return [];
  }
};

export const fetchCall = async (id: number): Promise<Call | null> => {
  try {
    const response = await axios.get<Call>(`${API_URL}/calls/${id}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch call:", error);
    return null;
  }
};

export const createCall = async (name: string) => {
  try {
    await axios.post<Call[]>(`${API_URL}/calls/${name}`);
  } catch (error) {
    console.error("Failed to create call", error);
  }
};
