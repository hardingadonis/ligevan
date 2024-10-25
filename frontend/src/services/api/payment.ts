import axios from 'axios';

import { Payment } from '@/schemas/payment.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const getPaymentByID = async (id: string): Promise<Payment> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/payments/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching payment:', error);
		throw error;
	}
};
