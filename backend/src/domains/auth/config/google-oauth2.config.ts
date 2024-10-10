import { registerAs } from '@nestjs/config';

export default registerAs('googleOAuth2', () => ({
	clientId: process.env.GOOGLE_OAUTH2_CLIENT_ID,
	clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
	clientCallback: process.env.GOOGLE_OAUTH2_CLIENT_CALLBACK,
}));
