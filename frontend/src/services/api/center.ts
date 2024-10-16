import axios from 'axios';
import { Center } from '@/schemas/center.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const getAllCenter = async (): Promise<Center[]> => {
  try {
    const response = await axios.get(`${apiBaseUrl}/api/centers`);
    return response.data;
  } catch (error) {
    console.error('Error fetching centers:', error);
    throw error;
  }
};
