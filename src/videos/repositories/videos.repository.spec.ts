import { Test } from "@nestjs/testing";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Video } from "../entities/video.entity";
import { VideosRepository } from "./videos.repository"

describe('Videos Repository', () => {
  let repository: VideosRepository;
  let ormMock: Repository<Video>;

  beforeEach(async () => {
    const mockRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn()
    }

    const moduleRef = await Test.createTestingModule({
      providers: [
        VideosRepository,
        {
          provide: getRepositoryToken(Video),
          useValue: mockRepository
        }
      ],
    }).compile();

    repository = moduleRef.get<VideosRepository>(VideosRepository);
    ormMock = moduleRef.get(getRepositoryToken(Video));
  })

  describe('create()', () => {
    it('should create a new video', async () => {
      jest.spyOn(ormMock, 'create').mockReturnValueOnce({
        id: 'anyid',
        title: 'anytitle',
        url: 'anyurl',
        created_at: new Date(),
        updated_at: new Date(),
      })

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
      const mockReturn = [{
        id: 'anyid',
        title: 'anytitle',
        url: 'anyurl',
        created_at: new Date(),
        updated_at: new Date(),
      }]

      jest.spyOn(ormMock, 'find').mockResolvedValueOnce(mockReturn);

      const response = await repository.findAll();

      expect(response).toEqual(mockReturn);
    })
  })
})