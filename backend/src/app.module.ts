import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
	imports: [MongooseModule.forRoot('DATABASE_URL')], // Replace DATABASE_URL with your MongoDB connection string
	controllers: [],
	providers: [],
})
export class AppModule {}
