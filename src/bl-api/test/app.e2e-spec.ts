import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { BabyNamesDto } from '../src/babyNames/babyNames.model';

describe('AppController (e2e)', () => {
  let app: INestApplication;
  let token: string;

  beforeAll(async () => {
    const response = await request('http://localhost:8080')
      .post("/api/login")
      .send({ user: "Root", password: "Root" })
    token = response.body.token
  }, 20_000)

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(() => {
    app.close();
  })

  it('/api/babynames (GET)', async () => {
    return request(app.getHttpServer())
      .get('/api/babynames')
      .set('authorization', `Bearer ${token}`)
      .expect(200)
  }); 
    it('/api/babynames (POST)', async () => {
      const newBabyName = new BabyNamesDto();

      newBabyName.birthYear = 2012;
      newBabyName.gender = "MALE";
      newBabyName.count = 17;
      newBabyName.rank = 54;
      newBabyName.name = "JACKSON";
      newBabyName.id = new Date().toISOString();
      newBabyName.ethnicity = "HYSPANIC";

      return request(app.getHttpServer())
        .post(`/api/babynames/${newBabyName.id}`)
        .set('authorization', `Bearer ${token}`)
        .send(newBabyName)
        .expect(201)
    });
    it('/api/babynames (PUT)', async () => {
      const newBabyName = new BabyNamesDto();

      newBabyName.birthYear = 2012;
      newBabyName.gender = "MALE";
      newBabyName.count = 17;
      newBabyName.rank = 54;
      newBabyName.name = "MICHAEL";
      newBabyName.id = "row-iw38-jv9i_qa43";
      newBabyName.ethnicity = "HYSPANIC";

      return request(app.getHttpServer())
        .put(`/api/babynames/${newBabyName.id}`)
        .set('authorization', `Bearer ${token}`)
        .send(newBabyName)
        .expect(200)
    });
    it('/api/babynames (DELETE)', async () => {
      const newBabyName = new BabyNamesDto();

      newBabyName.birthYear = 2012;
      newBabyName.gender = "FEMALE";
      newBabyName.count = 10;
      newBabyName.rank = 34;
      newBabyName.name = "FRIEREN";
      newBabyName.id = "Novo";
      newBabyName.ethnicity = "JAPANESE";

      await request(app.getHttpServer())
        .post(`/api/babynames/${newBabyName.id}`)
        .set('authorization', `Bearer ${token}`)
        .send(newBabyName)
        .expect(201)

      return request(app.getHttpServer())
        .delete(`/api/babynames/${newBabyName.id}`)
        .set('authorization', `Bearer ${token}`)
        .expect(200)
    });
});
