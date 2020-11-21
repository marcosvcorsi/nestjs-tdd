import * as request from 'supertest';
import { INestApplication } from "@nestjs/common"
import { Test } from "@nestjs/testing"
import { VideosModule } from "../src/videos/videos.module"

describe('Videos', () => {
  let app:INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [VideosModule]
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  })

  afterAll(async () => {
    await app.close();
  })

  it('/GET videos', async () => {
    const response = await request(app.getHttpServer()).get('/videos');

    expect(response.status).toBe(200);
  })
})