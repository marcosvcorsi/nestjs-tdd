import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from '../dtos/create-video.dto';
import { UpdateVideoDto } from '../dtos/update-video.dto';
import { Video } from '../entities/video.entity';
import { VideosRepository } from '../repositories/videos.repository';

@Injectable()
export class VideosService {

  constructor(private readonly videosRepository: VideosRepository) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    return this.videosRepository.create(createVideoDto);
  }

  async findAll(): Promise<Video[]> {
    return this.videosRepository.findAll();
  }

  async findById(id: string): Promise<Video | null> {
    return this.videosRepository.findById(id);
  }

  async update(id: string, updateVideoDto: UpdateVideoDto): Promise<void> {
    return this.videosRepository.update(id, updateVideoDto);
  }
}
