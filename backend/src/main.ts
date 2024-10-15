import { Logger, ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';

import { AppModule } from '@/app.module';
import { setupSwagger } from '@/swagger/setup';

// eslint-disable-next-line @typescript-eslint/no-require-imports
require('module-alias/register');

const bootstrap = async () => {
	const logger = new Logger();

	const app = await NestFactory.create(AppModule);
	const configService = app.get<ConfigService>(ConfigService);
	const corsConfig = configService.get('cors');
	const isProduction = configService.get('NODE_ENV') == 'production' || false;

	app.useGlobalPipes(new ValidationPipe());
	app.setGlobalPrefix('api');
	app.enableCors(isProduction ? corsConfig : { origin: '*' });
	app.useLogger(
		isProduction
			? ['fatal', 'error', 'warn', 'log']
			: ['fatal', 'error', 'warn', 'log', 'debug'],
	);

	// Setup Swagger
	setupSwagger(app);

	// Start the application
	await app.listen(3000);

	logger.log(`Server running on ${await app.getUrl()}`);
};

bootstrap();
