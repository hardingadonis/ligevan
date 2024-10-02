// eslint-disable-next-line @typescript-eslint/no-require-imports
require('module-alias/register');

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from '@/app.module';
import { setupSwagger } from '@/swagger/setup';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	setupSwagger(app);

	await app.listen(configService.get('BACKEND_PORT'));
};

bootstrap();
