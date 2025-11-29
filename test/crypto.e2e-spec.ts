import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';

describe('CryptoController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('/get-encrypt-data and /get-decrypt-data roundtrip', async () => {
    const payload = 'Round-trip test payload';

    const encryptRes = await request(app.getHttpServer())
      .post('/get-encrypt-data')
      .send({ payload })
      .expect(200);

    expect(encryptRes.body.successful).toBe(true);
    expect(encryptRes.body.data).toBeDefined();

    const { data1, data2 } = encryptRes.body.data;

    const decryptRes = await request(app.getHttpServer())
      .post('/get-decrypt-data')
      .send({ data1, data2 })
      .expect(200);

    expect(decryptRes.body.successful).toBe(true);
    expect(decryptRes.body.data.payload).toBe(payload);
  });
});
