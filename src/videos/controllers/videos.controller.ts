import { Body, Controller, Delete, Get, HttpCode, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { CreateVideoDto } from '../dtos/create-video.dto';
import { UpdateVideoDto } from '../dtos/update-video.dto';
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

  @Put(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async update(@Param('id') id: string, @Body() updateVideoDto: UpdateVideoDto): Promise<void> {
    return this.videosService.update(id, updateVideoDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async delete(@Param('id') id: string): Promise<void> {
    return this.videosService.delete(id);
  }
}
