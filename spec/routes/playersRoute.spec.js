const request = require('supertest');
const app = require('../../app');

describe('GET /players', () => {
  context('with an empty database', () => {
    it('responds with an empty array', async () => (
      request(app)
        .get('/players')
        .expect('Content-Type', /json/)
        .expect(200, { players: [] })
    ));
  });
});

describe('GET /players/:id', () => {
  context('with a non-existant player id', () => {
    it('returns a 404 status code', async () => (
      request(app)
        .get('/players/1')
        .expect(404)
    ));
  });
});

describe('DELETE /players/:id', () => {
  context('with a non-existant player id', () => {
    it('returns a 404 status code', async () => (
      request(app)
        .delete('/players/1')
        .expect(404)
    ));
  });
});
