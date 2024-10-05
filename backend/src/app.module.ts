import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DomainsModule } from '@/domains/domains.module';
import { MorganMiddleware } from '@/middlewares/morgan.middleware';
import { CoursesController } from './domains/courses/courses.controller';
import { CoursesModule } from './domains/courses/courses.module';

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		MongooseModule.forRootAsync({
			imports: [ConfigModule],
			useFactory: async (configService: ConfigService) => ({
				uri: configService.get<string>('DATABASE_URL'),
			}),
			inject: [ConfigService],
		}),
		DomainsModule,
		CoursesModule,
	],
	controllers: [CoursesController],
})
export class AppModule implements NestModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(MorganMiddleware).forRoutes('*');
	}
}
