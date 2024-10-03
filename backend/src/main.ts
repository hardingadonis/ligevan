// eslint-disable-next-line @typescript-eslint/no-require-imports
require('module-alias/register');

import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from '@/app.module';
import { setupSwagger } from '@/swagger/setup';

const bootstrap = async () => {
	const logger = new Logger();

	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');

	const configService = app.get(ConfigService);

	// Setup Swagger
	setupSwagger(app);

	// Start the application
	const port = configService.get('BACKEND_PORT');
	await app.listen(port);

	logger.log(`Server running on ${await app.getUrl()}`);
};

bootstrap();
