import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { mockUpdateVideoDto, mockVideo } from "./video";
import { Repository } from "typeorm";
import { Video } from "../../src/videos/entities/video.entity";
import { VideosRepository } from "../../src/videos/videos.repository";

describe('Videos Repository', () => {
  let repository: VideosRepository;
  let ormMock: Repository<Video>;

  beforeEach(async () => {
    const mockOrmRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      delete: jest.fn()
    }

    const moduleRef = await Test.createTestingModule({
      providers: [
        VideosRepository,
        {
          provide: getRepositoryToken(Video),
          useValue: mockOrmRepository
        }
      ],
    }).compile();

    repository = moduleRef.get<VideosRepository>(VideosRepository);
    ormMock = moduleRef.get(getRepositoryToken(Video));
  })

  describe('create()', () => {
    it('should create a new video', async () => {
      jest.spyOn(ormMock, 'create').mockReturnValueOnce(mockVideo())

      const response = await repository.create({
        title: 'anytitle',
        url: 'anyurl'
      })

      expect(response.id).toBeTruthy();
      expect(response.title).toBe('anytitle');
      expect(response.url).toBe('anyurl');
    })
  })

  describe('findAll()', () => {
    it('should return all videos', async () => {
      const mockReturn = [mockVideo()]

      jest.spyOn(ormMock, 'find').mockResolvedValueOnce(mockReturn);

      const response = await repository.findAll();

      expect(response).toEqual(mockReturn);
    })
  })

  describe('findById()', () => {
    it('should return a video', async () => {
      const mockReturn = mockVideo();

      jest.spyOn(ormMock, 'findOne').mockResolvedValueOnce(mockReturn);

      const response = await repository.findById('anyid');

      expect(response).toEqual(mockReturn);
    })
  })

  describe('update()', () => {
    it('should call OrmRepository update with correct values', async () => {
      const mockParam = mockUpdateVideoDto()
      
      const updateSpy = jest.spyOn(ormMock, 'update');

      await repository.update('anyid', mockParam);

      expect(updateSpy).toHaveBeenCalledWith('anyid', mockParam);
    })
  })

  describe('delete()', () => {
    it('should call OrmRepository delete with correct value', async () => {
      const deleteSpy = jest.spyOn(ormMock, 'delete');

      await repository.delete('anyid');

      expect(deleteSpy).toHaveBeenCalledWith('anyid');
    })
  })
})