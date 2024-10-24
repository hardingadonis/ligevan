const trimInput = (input: unknown): string => {
	if (typeof input !== 'string') {
		console.error(`Expected a string but received: ${typeof input}`);
		return '';
	}
	return input.trim();
};

const isValidName = (name: string): boolean => {
	const nameRegex =
		/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
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
