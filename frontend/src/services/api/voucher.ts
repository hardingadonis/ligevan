import axios from 'axios';

import { Voucher } from '@/schemas/voucher.schema';
import { apiBaseUrl } from '@/utils/apiBase';

export const getAllVoucher = async (): Promise<Voucher[]> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/vouchers`);
		return response.data;
	} catch (error) {
		console.error('Error fetching vouchers:', error);
		throw error;
	}
};
