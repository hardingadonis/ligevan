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

export const getVoucherById = async (id: string): Promise<Voucher> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/vouchers/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching voucher:', error);
		throw error;
	}
};

export const createVoucher = async (voucher: Voucher): Promise<void> => {
	try {
		await axios.post(`${apiBaseUrl}/api/vouchers`, voucher);
	} catch (error) {
		console.error('Error creating voucher:', error);
		throw error;
	}
};

export const updateVoucher = async (
	id: string,
	voucher: Voucher,
): Promise<Voucher> => {
	try {
		const response = await axios.put(
			`${apiBaseUrl}/api/vouchers/${id}`,
			voucher,
		);
		return response.data;
	} catch (error) {
		console.error('Error updating voucher:', error);
		throw error;
	}
};

export const deleteVoucher = async (id: string): Promise<void> => {
	try {
		await axios.delete(`${apiBaseUrl}/api/vouchers/${id}`);
	} catch (error) {
		console.error('Error deleting voucher:', error);
		throw error;
	}
};

export const checkVoucherCodeExists = async (
	code: string,
): Promise<boolean> => {
	try {
		const listVouchers = await getAllVoucher();
		return listVouchers.some((voucher) => voucher.code === code);
	} catch (error) {
		console.error('Error checking voucher code:', error);
		throw error;
	}
};
