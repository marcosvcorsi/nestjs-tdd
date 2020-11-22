import { Injectable } from '@nestjs/common';
import { CreateVideoDto } from '../dtos/create-video.dto';
import { Video } from '../entities/video.entity';
import { VideosRepository } from '../repositories/videos.repository';

@Injectable()
export class VideosService {

  constructor(private readonly videosRepository: VideosRepository) {}

  async create(createVideoDto: CreateVideoDto): Promise<Video> {
    return this.videosRepository.create(createVideoDto);
  }

  async findAll(): Promise<Video[]> {
    await this.videosRepository.findAll();

    return Promise.resolve([]);
  }
}
