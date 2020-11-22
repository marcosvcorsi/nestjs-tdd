import { Test, TestingModule } from '@nestjs/testing';
import { VideosRepository } from '../repositories/videos.repository';
import { VideosService } from './videos.service';

describe('VideosService', () => {
  let service: VideosService;
  let repository: VideosRepository;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn()
    }

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
    repository = module.get<VideosRepository>(VideosRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create()', () => {
    it('should call VideosRepository create with correct values', async () => {
      const createSpy = jest.spyOn(repository, 'create');

      const mockParam = {
        title: 'anytitle',
        url: 'anyurl'
      }

      await service.create(mockParam);

      expect(createSpy).toHaveBeenCalledWith(mockParam);
    })
  })
});
