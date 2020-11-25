import { Test, TestingModule } from '@nestjs/testing';
import { VideosService } from '../services/videos.service';
import { VideosController } from './videos.controller';

describe('VideosController', () => {
  let controller: VideosController;
  let service: VideosService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
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

    it('should throw if VideosService find all throws', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValueOnce(new Error());

      await expect(controller.findAll()).rejects.toThrow(new Error());
    })

    it('should return videos on success', async () => {
      const mockReturn = [
        {
          id: 'anyid',
          title: 'anytitle',
          url: 'anyurl',
          created_at: new Date(),
          updated_at: new Date()
        }
      ]

      jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockReturn);

      const response = await controller.findAll();

      expect(response).toEqual(mockReturn)
    })
  })

  describe('update()', () => {
    it('should call VideosService update with correct values', async () => {
      const updateSpy = jest.spyOn(service, 'update');

      const mockParam = {
        title: 'anytitle',
        url: 'anyurl'
      }

      await controller.update('anyid', mockParam);

      expect(updateSpy).toHaveBeenCalledWith('anyid', mockParam);
    })

    it('should throw if VideosService update throws', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      const mockParam = {
        title: 'anytitle',
        url: 'anyurl'
      }

      await expect(controller.update('anyid', mockParam)).rejects.toThrow(new Error())
    })
  })

  describe('delete()', () => {
    it('should call VideosService delete with correct value', async () => {
      const deleteSpy = jest.spyOn(service, 'delete');

      await controller.delete('anyid');

      expect(deleteSpy).toHaveBeenCalledWith('anyid');
    })
  })
});
