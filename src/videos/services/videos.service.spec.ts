import { Test, TestingModule } from '@nestjs/testing';
import { VideosRepository } from '../repositories/videos.repository';
import { VideosService } from './videos.service';

describe('VideosService', () => {
  let service: VideosService;

  beforeEach(async () => {
    const mockRepository = {}

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VideosService,
        {
          provide: VideosRepository,
          useValue: mockRepository
        }
      ],
    }).compile();

    service = module.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
