import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(),
    VideosModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
