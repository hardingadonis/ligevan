import { registerAs } from '@nestjs/config';

export default registerAs('momo', () => ({
	accessKey: process.env.MOMO_ACCESSKEY,
	secretKey: process.env.MOMO_SECRETKEY,
	partnerCode: process.env.MOMO_PARTNERCODE,
}));
