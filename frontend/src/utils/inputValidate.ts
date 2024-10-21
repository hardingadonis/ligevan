const trimInput = (input: unknown): string => {
	if (typeof input !== 'string') {
		console.error(`Expected a string but received: ${typeof input}`);
		return '';
	}
	return input.trim();
};

const isValidName = (name: string): boolean => {
	const nameRegex =
		/^[a-zA-ZÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỀỂưăạảấầẩẫậắằẳẵặẹẻẽềềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s]+$/;
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

const isValidVietnameseAddress = (address: string): boolean => {
	const addressRegex =
		/^[a-zA-Z0-9ÀÁÂÃÈÉÊÌÍÒÓÔÕÙÚĂĐĨŨƠàáâãèéêìíòóôõùúăđĩũơƯĂẠẢẤẦẨẪẬẮẰẲẴẶẸẺẼỀỂưăạảấầẩẫậắằẳẵặẹẻẽềểếỄỆỈỊỌỎỐỒỔỖỘỚỜỞỠỢỤỦỨỪễệỉịọỏốồổỗộớờởỡợụủứừỬỮỰỲỴÝỶỸửữựỳỵỷỹ\s,.-]+$/;
	return (
		addressRegex.test(address) && address.length >= 5 && address.length <= 100
	);
};

export const validateVietnameseAddress = (address: string): boolean => {
	const trimmedAddress = trimInput(address);
	return isValidVietnameseAddress(trimmedAddress);
};
