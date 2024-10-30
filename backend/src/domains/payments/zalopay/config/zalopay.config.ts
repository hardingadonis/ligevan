import { registerAs } from '@nestjs/config';

export default registerAs('zalopay', () => ({
	app_id: process.env.ZALOPAY_APP_ID,
	key1: process.env.ZALOPAY_KEY_1,
	key2: process.env.ZALOPAY_KEY_2,
	endpoint: `${process.env.ZALOPAY_ENDPOINT}/v2/create`,
}));
