// fetchStudentData function in '@/services/custom/getStudentbyToken'
import { getStudentByEmail } from '@/services/api/student';
import { decodeToken } from '@/utils/jwtDecode';

export const fetchStudentData = async () => {
	try {
		const token = localStorage.getItem('token');
		if (!token) {
			return null;
		}

		const decoded = decodeToken(token);
		const email = decoded.sub;

		const studentData = await getStudentByEmail(email);
		return studentData;
	} catch (error) {
		console.error('Error fetching student:', error);
		return null;
	}
};
