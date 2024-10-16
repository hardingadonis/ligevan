import { registerAs } from '@nestjs/config';

export default registerAs('cors', () => {
	const allowedOrigins =
		process.env.ALLOWED_ORIGINS?.split(',').map((origin) => origin.trim()) ||
		[];

	return {
		origin: (origin, callback) => {
			if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
				callback(null, true);
			} else {
				callback(new Error('Not allowed by CORS'), false);
			}
		},
		optionsSuccessStatus: 200,
	};
});
