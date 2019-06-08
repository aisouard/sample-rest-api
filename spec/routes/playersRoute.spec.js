const { expect } = require('chai');
const request = require('supertest');
const app = require('../../app');
const Player = require('../../app/models/player');

describe('GET /players', () => {
  context('with an empty database', () => {
    before(() => {
      Player.repository = [];
    });

    it('responds with an empty array', async () => (
      request(app)
        .get('/players')
        .expect('Content-Type', /json/)
        .expect(200, [])
    ));
  });

  context('with a database containing some players', () => {
    before(() => {
      Player.repository = [
        { id: 58, firstname: 'William', lastname: 'Doe' },
        { id: 32, firstname: 'John', lastname: 'Smith' }
      ];
    });

    it('responds with an array contaning the players sorted by their id', async () => (
      request(app)
        .get('/players')
        .expect('Content-Type', /json/)
        .expect(200, [
          { id: 32, firstname: 'John', lastname: 'Smith' },
          { id: 58, firstname: 'William', lastname: 'Doe' }
        ])
    ));
  });
});

describe('GET /players/:id', () => {
  context('with an empty database', () => {
    before(() => {
      Player.repository = [];
    });

    it('returns a 404 status code', async () => (
      request(app)
        .get('/players/1')
        .expect(404)
    ));
  });

  context('with the wrong player id', () => {
    before(() => {
      Player.repository = [
        { id: 23, firstname: 'Dominic', lastname: 'Thiem' }
      ];
    });

    it('returns a 404 status code', async () => (
      request(app)
        .get('/players/1')
        .expect(404)
    ));
  });

  context('with an existing player id', () => {
    before(() => {
      Player.repository = [
        { id: 23, firstname: 'Dominic', lastname: 'Thiem' }
      ];
    });

    it('returns a 200 status code with the player\'s data', async () => (
      request(app)
        .get('/players/23')
        .expect(200, { id: 23, firstname: 'Dominic', lastname: 'Thiem' })
    ));
  });
});

describe('DELETE /players/:id', () => {
  context('with an empty database', () => {
    before(() => {
      Player.repository = [];
    });

    it('returns a 404 status code', async () => (
      request(app)
        .delete('/players/1')
        .expect(404)
    ));

    it('doesn\'t change anything from the repository', () => {
      expect(Player.repository).to.be.an('array');
      expect(Player.repository).to.be.empty;
    });
  });

  context('with a non-existant player id', () => {
    before(() => {
      Player.repository = [
        { id: 23, firstname: 'Dominic', lastname: 'Thiem' }
      ];
    });

    it('returns a 404 status code', async () => (
      request(app)
        .delete('/players/1')
        .expect(404)
    ));

    it('doesn\'t change anything from the repository', () => {
      expect(Player.repository).to.deep.equal([
        { id: 23, firstname: 'Dominic', lastname: 'Thiem' }
      ]);
    });
  });

  context('with an existing player id', () => {
    before(() => {
      Player.repository = [
        { id: 23, firstname: 'Dominic', lastname: 'Thiem' },
        { id: 32, firstname: 'John', lastname: 'Smith' },
        { id: 58, firstname: 'William', lastname: 'Doe' }
      ];
    });

    it('returns a 204 status code', async () => (
      request(app)
        .delete('/players/32')
        .expect(204)
    ));

    it('deletes the specified player from the repository', () => {
      expect(Player.repository).to.deep.equal([
        { id: 23, firstname: 'Dominic', lastname: 'Thiem' },
        { id: 58, firstname: 'William', lastname: 'Doe' }
      ]);
    });

    it('returns a 404 status code when trying again', async () => (
      request(app)
        .delete('/players/32')
        .expect(404)
    ));
  });
});
