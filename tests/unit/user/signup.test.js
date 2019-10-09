import request from 'supertest';
import app from '../../../src/app';
var mongoose = require('mongoose');


describe('POST /api/user/signup', () => {
  const SIGNUP_URI = '/api/user/signup';

  beforeEach((done) => {
    function clearDB() {
      for (var i in mongoose.connection.collections) {
        mongoose.connection.collections[i].remove(function() {});
      }
      return done();
    }
  
    if (mongoose.connection.readyState === 0) {
      mongoose.connect(process.env.MONGO_URI,
        function(err) {
          if (err) {
            throw err;
          }
          return clearDB();
        }
      );
    } else {
      return clearDB();
    }
  });

  afterEach((done) => {
    mongoose.disconnect();
    return done();
  });

  afterAll(done => {
    return done();
  });

  it('should return a 422 response if no email provided', async () => {
    const response = await request(app)
      .post(SIGNUP_URI)
      .send({})
      .set('Accept', 'application/json')
      .expect(422, {
        "error":"\"email\" is required"
      })
  });
  it('should return a 422 response if email validation error', async () => {
    const response = await request(app)
      .post(SIGNUP_URI)
      .send({"email": "wrong-email-address"})
      .set('Accept', 'application/json')
      .expect(422, {
        "error":"\"email\" must be a valid email"
      })
  });
  it('should return a 422 response if no firstname and lastname', async () => {
    const response = await request(app)
      .post(SIGNUP_URI)
      .send({"email": "test@test.com"})
      .set('Accept', 'application/json')
      .expect(422, {
        "error":"\"firstname\" is required"
      })
  });
  it('should return a 422 response if no lastname', async () => {
    const response = await request(app)
      .post(SIGNUP_URI)
      .send({"email": "test@test.com", "firstname": "test"})
      .set('Accept', 'application/json')
      .expect(422, {
        "error":"\"lastname\" is required"
      })
  });
  it('should return a 422 response if no firstname', async () => {
    const response = await request(app)
      .post(SIGNUP_URI)
      .send({"email": "test@test.com", "lastname": "test"})
      .set('Accept', 'application/json')
      .expect(422, {
        "error":"\"firstname\" is required"
      })
  });
  it('should return a 422 response if no password', async () => {
    const response = await request(app)
      .post(SIGNUP_URI)
      .send({"email": "test@test.com", "firstname": "test", "lastname": "test"})
      .set('Accept', 'application/json')
      .expect(422, {
        "error":"\"password\" is required"
      })
  });
  it('should return a 422 response if password too short', async () => {
    const response = await request(app)
      .post(SIGNUP_URI)
      .send({"email": "test@test.com", "firstname": "test", "lastname": "test", "password": "test"})
      .set('Accept', 'application/json')
      .expect(422, {
        "error":"\"password\" length must be at least 6 characters long"
      })
  });
  // it('should return a 200 response if valid request', async () => {
  //   const response = request(app)
  //     .post('/api/user/signup')
  //     .send({"email": "test@test.com", "firstname": "test", "lastname": "test", "password": "test123"})
  //     .set('Accept', 'application/json')
  //     .expect(200)
  // });
});
