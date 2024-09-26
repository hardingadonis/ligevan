import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwagger = (app: INestApplication<any>) => {
	const config = new DocumentBuilder()
		.setTitle('bookish API doumentation')
		.setDescription('A library management web tool for efficient organization')
		.setVersion('1.0.0')
		.setLicense(
			'GPL-3.0 license',
			'https://github.com/hardingadonis/bookish/blob/main/LICENSE',
		)
		.build();

	const document = SwaggerModule.createDocument(app, config);
	SwaggerModule.setup('api-docs', app, document);
};
