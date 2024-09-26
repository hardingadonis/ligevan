import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { setupSwagger } from './swagger/setup';

const bootstrap = async () => {
	const app = await NestFactory.create(AppModule);

	const configService = app.get(ConfigService);

	setupSwagger(app);

	await app.listen(configService.get('BACKEND_PORT'));
};

bootstrap();
