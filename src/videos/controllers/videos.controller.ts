import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateVideoDto } from '../dtos/create-video.dto';
import { Video } from '../entities/video.entity';
import { VideosService } from '../services/videos.service';

@Controller('videos')
export class VideosController {

  constructor(private readonly videosService: VideosService) {}
  
  @Get()
  async findAll(): Promise<Video[]> {
    return this.videosService.findAll();
  }

  @Post()
  async create(@Body() createVideoDto: CreateVideoDto): Promise<Video> {
    return this.videosService.create(createVideoDto);
  }
}
