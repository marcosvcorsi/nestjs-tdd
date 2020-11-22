import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from '../services/videos.service';
import { VideosController } from './videos.controller';

describe('VideosController', () => {
  let controller: VideosController;

  beforeEach(async () => {
    const mockService = {}

    const module: TestingModule = await Test.createTestingModule({
      controllers: [VideosController],
      providers: [
        {
          provide: VideosService,
          useValue: mockService
        }
      ]
    }).compile();

    controller = module.get<VideosController>(VideosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
