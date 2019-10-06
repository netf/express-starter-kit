import request from 'supertest';
import app from '../../src/app';

describe('index', () => {
  it('should return a successful response for GET /', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
