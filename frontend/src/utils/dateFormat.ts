import moment from 'moment-timezone';

export const formatDateToVietnamTimezone = (date: Date): string => {
	return moment(date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY');
};

export const formatDateTimeToVietnamTimezone = (date: Date): string => {
	return moment(date).tz('Asia/Ho_Chi_Minh').format('HH:MM DD/MM/YYYY');
};

export const formatDateToUTC = (date: Date): string => {
	return moment(date).tz('Asia/Ho_Chi_Minh').utc().format('YYYY-MM-DD');
};

export const formatTimeToVietnamTimezone = (date: Date): string => {
	return moment(date).tz('Asia/Ho_Chi_Minh').format('HH:mm');
};

export const convertToUTC = (date: Date): Date => {
	const utcDate = new Date(date);
	utcDate.setHours(utcDate.getHours() - 7);
	return utcDate;
};
