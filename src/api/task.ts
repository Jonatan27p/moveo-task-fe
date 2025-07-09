import axios from "axios";

export interface Task {
  id: number;
  name: string;
  status: string;
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchTasks = async (callId: number): Promise<Task[]> => {
  try {
    const response = await axios.get<Task[]>(`${API_URL}/task/${callId}`);
    return response.data;
  } catch (error) {
    console.error("Failed to fetch tasks:", error);
    return [];
  }
};

export const updateTask = async (id: number, name: string) => {
  try {
    await axios.put<Task[]>(`${API_URL}/task/${id}/${name}`);
  } catch (error) {
    console.error("Failed to update task", error);
  }
};

export const createTask = async (callId: number, name: string) => {
  try {
    await axios.post<Task[]>(`${API_URL}/task/${callId}/${name}`);
  } catch (error) {
    console.error("Failed to create task", error);
  }
};
