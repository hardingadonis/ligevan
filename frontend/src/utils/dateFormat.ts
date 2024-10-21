import moment from 'moment-timezone';

export const formatDateToVietnamTimezone = (date: Date): string => {
	return moment(date).tz('Asia/Ho_Chi_Minh').format('DD/MM/YYYY');
};
