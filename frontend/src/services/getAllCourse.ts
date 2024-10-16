import axios from 'axios';
import { Course } from '@/models/course';

const apiBaseUrl = import.meta.env.VITE_BACKEND_URL;

export const getAllCourse = async (): Promise<Course[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/courses`);
    return response.data;
  } catch (error) {
    console.error('Error fetching course:', error);
    throw error;
  }
};
