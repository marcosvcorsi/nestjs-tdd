import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_NAME,
      entities: ["dist/**/*.entity.js"],
      migrations: ["dist/shared/database/migrations/*.js"],
      cli: {
        "migrationsDir": "src/shared/database/migrations"
      }
    }),
    VideosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
