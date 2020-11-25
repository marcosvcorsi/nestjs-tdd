import * as request from 'supertest';
import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { VideosModule } from "../src/videos/videos.module"
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../src/videos/entities/video.entity';
import { getRepository, Repository } from 'typeorm';
import { ConfigModule } from '@nestjs/config';

describe('Videos', () => {
  let app:INestApplication;
  let repository: Repository<Video>

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({
          envFilePath: '.env.test'
        }),
        TypeOrmModule.forRoot({
          type: "postgres",
          host: process.env.DB_HOST,
          port: Number(process.env.DB_PORT),
          username: process.env.DB_USER,
          password: process.env.DB_PASS,
          database: process.env.DB_NAME,
          entities: [Video],
          synchronize: true
        }),
        VideosModule
      ]
    }).compile();

    repository = getRepository(Video);

    app = moduleRef.createNestApplication();
    await app.init();
  })

  beforeEach(async () => {
    await repository.delete({});
  })

  afterAll(async () => {
    await app.close();
  })

  test('/GET videos', async () => {
    const video = repository.create({
      title: 'anytitle',
      url: 'anyurl'
    })

    await repository.save(video);

    const response = await request(app.getHttpServer()).get('/videos');

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(1);
    expect(response.body[0].title).toBe('anytitle');
    expect(response.body[0].url).toBe('anyurl');
  })

  test('/GET/:id videos', async () => {
    const video = repository.create({
      title: 'anytitle',
      url: 'anyurl'
    })

    await repository.save(video);

    const response = await request(app.getHttpServer()).get(`/videos/${video.id}`);

    expect(response.status).toBe(200);
    expect(response.body.title).toBe('anytitle');
    expect(response.body.url).toBe('anyurl');
  })

  test('/POST videos', async () => {
    const response = await request(app.getHttpServer()).post('/videos').send({
      title: 'anytitle',
      url: 'anyurl'
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.title).toBe('anytitle');
    expect(response.body.url).toBe('anyurl')
  })

  test('/PUT/:id videos', async () => {
    const video = repository.create({
      title: 'anytitle',
      url: 'anyurl'
    })

    await repository.save(video);

    const response = await request(app.getHttpServer()).put(`/videos/${video.id}`).send({
      title: 'updatedtitle',
      url: 'updatedurl'
    })

    const updatedVideo = await repository.findOne(video.id);

    expect(response.status).toBe(204);
    expect(updatedVideo.title).toBe('updatedtitle')
    expect(updatedVideo.url).toBe('updatedurl')
  })

  test('/DELETE/:id videos', async () => {
    const video = repository.create({
      title: 'anytitle',
      url: 'anyurl'
    })

    await repository.save(video);

    const response = await request(app.getHttpServer()).delete(`/videos/${video.id}`);

    const videoDeleted = await repository.findOne(video.id);
    
    expect(response.status).toBe(204);
    expect(videoDeleted).toBeFalsy()
  })
})