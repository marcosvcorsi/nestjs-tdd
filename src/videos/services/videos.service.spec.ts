import { Test, TestingModule } from '@nestjs/testing';
import { VideosRepository } from '../repositories/videos.repository';
import { VideosService } from './videos.service';

describe('VideosService', () => {
  let service: VideosService;
  let repository: VideosRepository;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      findAll: jest.fn(),
      update: jest.fn(),
      findById: jest.fn()
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

    it('should throw if VideosRepository create throws', async () => {
      jest.spyOn(repository, 'create').mockRejectedValueOnce(new Error());

      const mockParam = {
        title: 'anytitle',
        url: 'anyurl'
      }

      await expect(service.create(mockParam)).rejects.toThrow(new Error());
    })

    it('should return a video on success', async () => {
      const mockReturn = {
        id: 'anyid',
        title: 'anytitle',
        url: 'anyurl',
        created_at: new Date(),
        updated_at: new Date()
      }

      jest.spyOn(repository, 'create').mockResolvedValueOnce(mockReturn);

      const mockParam = {
        title: 'anytitle',
        url: 'anyurl'
      }

      const response = await service.create(mockParam);

      expect(response).toEqual(mockReturn);
    })
  })

  describe('findAll()', () => {
    it('should call VideosRepository find all', async () => {
      const findSpy = jest.spyOn(repository, 'findAll');

      await service.findAll();

      expect(findSpy).toHaveBeenCalled();
    })

    it('should throw if VideosRepository find all throws', async () => {
      jest.spyOn(repository, 'findAll').mockRejectedValueOnce(new Error());

      await expect(service.findAll()).rejects.toThrow(new Error())
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

      jest.spyOn(repository, 'findAll').mockResolvedValueOnce(mockReturn);

      const response = await service.findAll();

      expect(response).toEqual(mockReturn);
    })
  })

  describe('findById()', () => {
    it('should call VideosRepository find by id with correct value', async () => {
      const findSpy = jest.spyOn(repository, 'findById');

      await service.findById('anyid');

      expect(findSpy).toHaveBeenCalledWith('anyid');
    })

    it('should throw if VideosRepository find by id throws', async () => {
      jest.spyOn(repository, 'findById').mockRejectedValueOnce(new Error());

      await expect(service.findById('anyid')).rejects.toThrow(new Error());
    })

    it('should return a video on success', async () => {
      const mockReturn = {
        id: 'anyid',
        title: 'anytitle',
        url: 'anyurl',
        created_at: new Date(),
        updated_at: new Date()
      }

      jest.spyOn(repository, 'findById').mockResolvedValueOnce(mockReturn)

      const response = await service.findById('anyid');

      expect(response).toEqual(mockReturn);
    })
  })

  describe('update()', () => {
    it('should call VideosRepository update with correct values', async () => {
      const updateSpy = jest.spyOn(repository, 'update');
      
      const mockParam = {
        title: 'anytitle',
        url: 'anyurl'
      }

      await service.update('anyid', mockParam);

      expect(updateSpy).toHaveBeenCalledWith('anyid', mockParam);
    })

    it('should throw if VideosRepository throws', async () => {
      jest.spyOn(repository, 'update').mockRejectedValueOnce(new Error());

      const mockParam = {
        title: 'anytitle',
        url: 'anyurl'
      }

      await expect(service.update('anyid', mockParam)).rejects.toThrow(new Error());
    })
  })
});
