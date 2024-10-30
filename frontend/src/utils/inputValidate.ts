const trimInput = (input: unknown): string => {
	if (typeof input !== 'string') {
		console.error(`Expected a string but received: ${typeof input}`);
		return '';
	}
	return input.trim();
};

const isValidName = (name: string): boolean => {
	const nameRegex =
		/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủưứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
	return nameRegex.test(name) && name.length >= 2 && name.length <= 50;
};

export const validateName = (name: string): boolean => {
	const trimmedName = trimInput(name);
	return isValidName(trimmedName);
};

const isValidPhoneNumber = (phoneNumber: string): boolean => {
	const phoneRegex = /^\d{10,11}$/;
	return phoneRegex.test(phoneNumber);
};

const isValidVietnamesePhoneNumber = (phoneNumber: string): boolean => {
	const vietnamesePhoneRegex =
		/^((03[2-9]|07[06789]|08[1-5]|09[0-8]|05[68]|099|059)\d{7})$|^(02\d{1,2}\d{7})$/;
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

const isValidVietnameseAddress = (address: string): boolean => {
	const addressRegex =
		/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂưạảấầẩẫậắằẳẵặẹẻẽềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s,.-]+$/;
	return (
		addressRegex.test(address) && address.length >= 5 && address.length <= 100
	);
};

export const validateVietnameseAddress = (address: string): boolean => {
	const trimmedAddress = trimInput(address);
	return isValidVietnameseAddress(trimmedAddress);
};

const isValidCode = (code: string): boolean => {
	const codeRegex =
		/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂẾỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
	return codeRegex.test(code) && code.length >= 2 && code.length <= 50;
};

export const validateCode = (code: string): boolean => {
	const trimmedCode = trimInput(code);
	return isValidCode(trimmedCode);
};

const isValidDiscount = (discount: string): boolean => {
	const discountValue = parseFloat(discount);
	return !isNaN(discountValue) && discountValue > 0 && discountValue <= 100;
};

export const validateDiscount = (discount: string): boolean => {
	const trimmedDiscount = trimInput(discount);
	return isValidDiscount(trimmedDiscount);
};

const isValidNumber = (input: string): boolean => {
	const numberRegex = /^\d+$/;
	return numberRegex.test(input);
};

export const validateNumber = (input: string): boolean => {
	const trimmedInput = trimInput(input);
	return isValidNumber(trimmedInput);
};

const isValidEmailName = (name: string): boolean => {
	const emailNameRegex = /^[a-zA-Z0-9._%+-]+$/;
	return emailNameRegex.test(name);
};

export const validateEmailName = (name: string): boolean => {
	const trimmedName = trimInput(name);
	return isValidEmailName(trimmedName);
};
