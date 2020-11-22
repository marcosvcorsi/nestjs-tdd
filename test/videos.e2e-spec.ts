import * as request from 'supertest';
import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { VideosModule } from "../src/videos/videos.module"
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from '../src/videos/entities/video.entity';
import { getRepository } from 'typeorm';

describe('Videos', () => {
  let app:INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: "postgres",
          host: "localhost",
          port: 5432,
          username: "postgres",
          password: "docker",
          database: "yt_crud_tests",
          entities: [Video],
          migrationsRun: true,
          synchronize: true
        }),
        VideosModule
      ]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  })

  beforeEach(async () => {
    await getRepository(Video).delete({});
  })

  afterAll(async () => {
    await getRepository(Video).delete({});

    await app.close();
  })

  it('/POST videos', async () => {
    const response = await request(app.getHttpServer()).post('/videos').send({
      title: 'anytitle',
      url: 'anyurl'
    });

    expect(response.status).toBe(201);
    expect(response.body.id).toBeTruthy();
    expect(response.body.title).toBe('anytitle');
    expect(response.body.url).toBe('anyurl')
  })
})