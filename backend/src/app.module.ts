import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import corsConfig from '@/config/cors.config';
import { DomainsModule } from '@/domains/domains.module';
import { MorganMiddleware } from '@/middlewares/morgan.middleware';

@Module({
	imports: [
		ConfigModule.forRoot({ load: [corsConfig], isGlobal: true }),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('DATABASE_URL'),
			}),
			inject: [ConfigService],
		}),
		DomainsModule,
	],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(MorganMiddleware).forRoutes('*');
	}
}
