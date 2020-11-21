import { Module } from '@nestjs/common';
import { VideosModule } from './videos/videos.module';

@Module({
  imports: [VideosModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
