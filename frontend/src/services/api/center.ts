import axios from 'axios';

import { Center } from '@/schemas/center.schema';
import { Course } from '@/schemas/course.schema';
import { Voucher } from '@/schemas/voucher.schema';
import { apiBaseUrl } from '@/utils/apiBase';

import { getTeacherByEmail } from './teacher';

export const getAllCenter = async (): Promise<Center[]> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/centers`);
		return response.data;
	} catch (error) {
		console.error('Error fetching centers:', error);
		throw error;
	}
};

export const getCenterById = async (id: string): Promise<Center> => {
	try {
		const response = await axios.get(`${apiBaseUrl}/api/centers/${id}`);
		return response.data;
	} catch (error) {
		console.error('Error fetching center:', error);
		throw error;
	}
};

export const updateCenter = async (
	id: string,
	updateData: Partial<Center>,
): Promise<Center> => {
	try {
		const response = await axios.put(
			`${apiBaseUrl}/api/centers/${id}`,
			updateData,
		);
		return response.data;
	} catch (error) {
		console.error('Error updating center:', error);
		throw error;
	}
};

export const deleteCenter = async (id: string): Promise<void> => {
	try {
		await axios.delete(`${apiBaseUrl}/api/centers/${id}`);
	} catch (error) {
		console.error('Error deleting center:', error);
		throw error;
	}
};

export const createCenter = async (center: Center): Promise<void> => {
	try {
		await axios.post(`${apiBaseUrl}/api/centers`, center);
	} catch (error) {
		console.error('Error creating center:', error);
		throw error;
	}
};

// Trả về danh sách khóa học của mỗi trung tâm (theo id trung tâm)
export const getCoursesByCenterId = async (id: string): Promise<Course[]> => {
	try {
		const center = await getCenterById(id);
		return center.courses || [];
	} catch (error) {
		console.error('Error fetching courses by center id:', error);
		throw error;
	}
};

// Trả về danh sách mã giảm giá của mỗi trung tâm (theo id trung tâm)
export const getVouchersByCenterId = async (id: string): Promise<Voucher[]> => {
	try {
		const center = await getCenterById(id);
		return center.vouchers || [];
	} catch (error) {
		console.error('Error fetching vouchers by center id:', error);
		throw error;
	}
};

export const getCentersByTeacherEmail = async (
	email: string,
): Promise<Center[]> => {
	try {
		const teacher = await getTeacherByEmail(email);
		if (!teacher) {
			throw new Error('Teacher not found');
		}

		const centers = await getAllCenter();
		const centersWithTeacher = centers.filter((center) =>
			center.teachers?.some((t) => t.email === email),
		);

		return centersWithTeacher;
	} catch (error) {
		console.error('Error fetching centers by teacher email:', error);
		throw error;
	}
};
