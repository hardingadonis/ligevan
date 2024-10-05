import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { setupSwagger } from '@/swagger/setup';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('module-alias/register');

const bootstrap = async () => {
	const logger = new Logger();

	const app = await NestFactory.create(AppModule);
	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');

	// Setup Swagger
	setupSwagger(app);

	// Start the application
	await app.listen(3000);

	logger.log(`Server running on ${await app.getUrl()}`);
};

bootstrap();
