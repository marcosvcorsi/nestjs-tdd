import { Test, TestingModule } from '@nestjs/testing';
import { mockCreateVideoDto, mockUpdateVideoDto, mockVideo } from './video';
import { VideosService } from '../../src/videos/videos.service';
import { VideosController } from '../../src/videos/videos.controller';

describe('VideosController', () => {
  let controller: VideosController;
  let service: VideosService;

  beforeEach(async () => {
    const mockService = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      delete: jest.fn(),
      findById: jest.fn()
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

      const mockParam = mockCreateVideoDto();

      await controller.create(mockParam);

      expect(createSpy).toHaveBeenCalledWith(mockParam);
    })

    it('should throw if VideosService create throws', async () => {
      jest.spyOn(service, 'create').mockRejectedValueOnce(new Error());

      await expect(controller.create(mockCreateVideoDto())).rejects.toThrow(new Error());
    })

    it('should return a video on success', async () => {
      const mockReturn = mockVideo();
      
      jest.spyOn(service, 'create').mockResolvedValueOnce(mockReturn);

      const response = await controller.create(mockCreateVideoDto())

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
        mockVideo()
      ]

      jest.spyOn(service, 'findAll').mockResolvedValueOnce(mockReturn);

      const response = await controller.findAll();

      expect(response).toEqual(mockReturn)
    })
  })

  describe('findById()', () => {
    it('should call VideosService find by id with correct value', async () => {
      const findSpy = jest.spyOn(service, 'findById');

      await controller.findById('anyid');

      expect(findSpy).toHaveBeenCalledWith('anyid');
    })

    it('should throw if VideosService find by id throws', async () => {
      jest.spyOn(service, 'findById').mockRejectedValueOnce(new Error());

      await expect(controller.findById('anyid')).rejects.toThrow(new Error());
    })

    it('should return a video on success', async () => {
      const mockReturn = mockVideo()

      jest.spyOn(service, 'findById').mockResolvedValueOnce(mockReturn);

      const response = await controller.findById('anyid');

      expect(response).toEqual(mockReturn);
    })
  })

  describe('update()', () => {
    it('should call VideosService update with correct values', async () => {
      const updateSpy = jest.spyOn(service, 'update');

      const mockParam = mockUpdateVideoDto();

      await controller.update('anyid', mockParam);

      expect(updateSpy).toHaveBeenCalledWith('anyid', mockParam);
    })

    it('should throw if VideosService update throws', async () => {
      jest.spyOn(service, 'update').mockRejectedValueOnce(new Error());

      await expect(controller.update('anyid', mockUpdateVideoDto())).rejects.toThrow(new Error())
    })
  })

  describe('delete()', () => {
    it('should call VideosService delete with correct value', async () => {
      const deleteSpy = jest.spyOn(service, 'delete');

      await controller.delete('anyid');

      expect(deleteSpy).toHaveBeenCalledWith('anyid');
    })

    it('should throw if VideosService delete throws', async () => {
      jest.spyOn(service, 'delete').mockRejectedValueOnce(new Error());

      await expect(controller.delete('anyid')).rejects.toThrow(new Error())
    })
  })
});
