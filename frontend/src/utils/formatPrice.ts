export const formatPrice = (value: number | undefined): string => {
	if (value === undefined || value === null) return '';
	return value.toLocaleString('vi-VN');
};
