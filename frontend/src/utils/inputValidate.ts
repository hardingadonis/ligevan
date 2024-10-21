const trimInput = (input: string): string => {
	return input.trim();
};

const isValidName = (name: string): boolean => {
	const nameRegex = /^[a-zA-Z\s]+$/;
	return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
};

export const validateName = (name: string): boolean => {
	const trimmedName = trimInput(name);
	return isValidName(trimmedName);
};

const isValidPhoneNumber = (phoneNumber: string): boolean => {
	const phoneRegex = /^[0-9]{10,11}$/;
	return phoneRegex.test(phoneNumber);
};

const isValidVietnamesePhoneNumber = (phoneNumber: string): boolean => {
	const vietnamesePhoneRegex =
		/^(03[2-9]|05[6|8|9]|07[0|6-9]|08[1-5]|09[0-9])[0-9]{7}$/;
	return vietnamesePhoneRegex.test(phoneNumber);
};

export const validatePhoneNumber = (phoneNumber: string): boolean => {
	const trimmedPhoneNumber = trimInput(phoneNumber);
	return isValidPhoneNumber(trimmedPhoneNumber);
};

export const validateVietnamesePhoneNumber = (phoneNumber: string): boolean => {
	const trimmedPhoneNumber = trimInput(phoneNumber);
	return isValidVietnamesePhoneNumber(trimmedPhoneNumber);
};

const isValidDateFormat = (date: string): boolean => {
	const dateRegex = /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/;
	return dateRegex.test(date);
};

export const validateDateFormat = (date: string): boolean => {
	const trimmedDate = trimInput(date);
	return isValidDateFormat(trimmedDate);
};

const isWithinLastThreeYears = (date: string): boolean => {
	const [day, month, year] = date.split('/').map(Number);
	const birthDate = new Date(year, month - 1, day);
	const currentDate = new Date();
	const threeYearsAgo = new Date();
	threeYearsAgo.setFullYear(currentDate.getFullYear() - 3);
	return birthDate <= currentDate && birthDate >= threeYearsAgo;
};

export const validateBirthDate = (date: string): boolean => {
	const trimmedDate = trimInput(date);
	return isValidDateFormat(trimmedDate) && isWithinLastThreeYears(trimmedDate);
};
