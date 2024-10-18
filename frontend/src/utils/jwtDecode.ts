import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
	sub: string;
	role: string;
	iat: number;
	exp: number;
	[key: string]: string | number | boolean | object | null;
}

export const decodeToken = (token: string): JwtPayload => {
	try {
		const decoded = jwtDecode<JwtPayload>(token);
		return decoded;
	} catch {
		throw new Error('Invalid token');
	}
};
