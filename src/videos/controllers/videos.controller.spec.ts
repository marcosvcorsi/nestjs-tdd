import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from '../services/videos.service';
import { VideosController } from './videos.controller';

describe('VideosController', () => {
  let controller: VideosController;
  let service: VideosService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn()
    }

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
    service = module.get<VideosService>(VideosService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create()', () => {
    it('should call VideosService create with correct values', async () => {
      const createSpy = jest.spyOn(service, 'create');

      const mockParam = {
        title: 'anytitle',
        url: 'anyurl'
      }

      await controller.create(mockParam);

      expect(createSpy).toHaveBeenCalledWith(mockParam);
    })

    it('should throw if VideosService create throws', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      const mockParam = {
        title: 'anytitle',
        url: 'anyurl'
      }

      await expect(controller.create(mockParam)).rejects.toThrow(new Error());
    })

    it('should return a video on success', async () => {
      const mockReturn = {
        id: 'anyid',
        title: 'anytitle',
        url: 'anyurl',
        created_at: new Date(),
        updated_at: new Date()
      }

      jest.spyOn(service, 'create').mockResolvedValueOnce(mockReturn);

      const mockParam = {
        title: 'anytitle',
        url: 'anyurl'
      }

      const response = await controller.create(mockParam)

      expect(response).toEqual(mockReturn);
    })
  })

  describe('findAll()', () => {
    it('should call VideosService find all', async () => {
      const findSpy = jest.spyOn(service, 'findAll');

      await controller.findAll();

      expect(findSpy).toHaveBeenCalled()
    })
  })
});
