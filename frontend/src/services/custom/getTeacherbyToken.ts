import { getTeacherByEmail } from '@/services/api/teacher';
import { decodeToken } from '@/utils/jwtDecode';

export const fetchTeacherData = async () => {
	try {
		const token = localStorage.getItem('teacherToken');
		if (!token) {
			throw new Error('No token found');
		}

		const decoded = decodeToken(token);
		const email = decoded.sub;

		const teacherData = await getTeacherByEmail(email);
		return teacherData;
	} catch (error) {
		console.error('Error fetching teacher:', error);
		throw error;
	}
};
