import { registerAs } from '@nestjs/config';

export default registerAs('googleOAuth2', () => ({
	clientID: process.env.GOOGLE_OAUTH2_CLIENT_ID,
	clientSecret: process.env.GOOGLE_OAUTH2_CLIENT_SECRET,
	callbackURL: process.env.GOOGLE_OAUTH2_CLIENT_CALLBACK,
}));
