const request = require('supertest');
const app = require('../../app');
const Player = require('../../app/models/player');

describe('GET /players', () => {
  context('with an empty database', () => {
    it('responds with an empty array', async () => (
      request(app)
        .get('/players')
        .expect('Content-Type', /json/)
        .expect(200, { players: [] })
    ));
  });

  context('with a database containing some players', () => {
    before(() => {
      Player.seed([
        { id: 58, firstname: 'William', lastname: 'Doe' },
        { id: 32, firstname: 'John', lastname: 'Smith' }
      ]);
    });

    it('responds with an array contaning the players sorted by their id', async () => (
      request(app)
        .get('/players')
        .expect('Content-Type', /json/)
        .expect(200, { players: [
            { id: 32, firstname: 'John', lastname: 'Smith' },
            { id: 58, firstname: 'William', lastname: 'Doe' }
          ] })
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
