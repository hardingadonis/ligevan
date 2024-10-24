export const formatPrice = (value: number | undefined): string => {
	if (value === undefined || value === null) return '';
	return new Intl.NumberFormat('vi-VN', {
		style: 'currency',
		currency: 'VND',
	}).format(value);
};
