const { expect } = require('chai');
const Player = require('../../app/models/player');

describe('Player', () => {
  describe('.findAll', () => {
    context('with an empty repository', () => {
      let result;

      before(() => {
        Player.repository = [];
        result = Player.findAll();
      });

      it('returns an empty array', () => {
        expect(result).to.be.an('array');
        expect(result).to.be.empty;
      });
    });

    context('with a repository containing some players', () => {
      let result;

      before(() => {
        Player.repository = [
          { id: 38, firstname: 'Dominic', lastname: 'Thiem' },
          { id: 25, firstname: 'Bill', lastname: 'Hoover' }
        ];
        result = Player.findAll();
      });

      it('returns an array of players sorted by their id', () => {
        expect(result).to.deep.equal([
          { id: 25, firstname: 'Bill', lastname: 'Hoover' },
          { id: 38, firstname: 'Dominic', lastname: 'Thiem' }
        ]);
      });
    });
  });

  describe('.findById', () => {
    context('with an empty repository', () => {
      let result;

      before(() => {
        Player.repository = [];
        result = Player.findById(25);
      });

      it('returns null', () => {
        expect(result).to.be.null;
      });
    });

    context('with a repository containing some players', () => {
      let result;

      before(() => {
        Player.repository = [
          { id: 38, firstname: 'Dominic', lastname: 'Thiem' },
          { id: 25, firstname: 'Bill', lastname: 'Hoover' }
        ];
        result = Player.findById(25);
      });

      it('returns the player data belonging to the specified id', () => {
        expect(result).to.deep.eq({ id: 25, firstname: 'Bill', lastname: 'Hoover' });
      });
    });
  });

  describe('.seed', () => {
    context('with an empty array', () => {
      before(() => {
        Player.repository = [];
        Player.seed([]);
      });

      it('keeps the repository empty', () => {
        expect(Player.repository).to.be.an('array');
        expect(Player.repository).to.be.empty;
      });
    });

    context('with an array containing some data', () => {
      before(() => {
        Player.repository = [
          { id: 12, firstname: 'Rafael', lastname: 'Nadal' }
        ];
        Player.seed([
          { id: 38, firstname: 'Dominic', lastname: 'Thiem' },
          { id: 25, firstname: 'Bill', lastname: 'Hoover' }
        ]);
      });

      it('adds the new data to the repository', () => {
        expect(Player.repository).to.deep.equal([
          { id: 12, firstname: 'Rafael', lastname: 'Nadal' },
          { id: 38, firstname: 'Dominic', lastname: 'Thiem' },
          { id: 25, firstname: 'Bill', lastname: 'Hoover' }
        ]);
      });
    });
  });

  describe('removeById', () => {
    context('with an empty repository', () => {
      let result;

      before(() => {
        Player.repository = [];
        result = Player.removeById(25);
      });

      it('returns false', () => {
        expect(result).to.be.false;
      });

      it('doesn\'t change anything inside the repository', () => {
        expect(Player.repository).to.be.an('array');
        expect(Player.repository).to.be.empty;
      });
    });

    context('with a populated repository but unknown id', () => {
      let result;

      before(() => {
        Player.repository = [
          { id: 12, firstname: 'Rafael', lastname: 'Nadal' },
          { id: 38, firstname: 'Dominic', lastname: 'Thiem' },
          { id: 25, firstname: 'Bill', lastname: 'Hoover' }
        ];
        result = Player.removeById(58);
      });

      it('returns false', () => {
        expect(result).to.be.false;
      });

      it('doesn\'t change anything inside the repository', () => {
        expect(Player.repository).to.deep.equal([
          { id: 12, firstname: 'Rafael', lastname: 'Nadal' },
          { id: 38, firstname: 'Dominic', lastname: 'Thiem' },
          { id: 25, firstname: 'Bill', lastname: 'Hoover' }
        ]);
      });
    });

    context('with a populated repository and known id', () => {
      let result;

      before(() => {
        Player.repository = [
          { id: 12, firstname: 'Rafael', lastname: 'Nadal' },
          { id: 38, firstname: 'Dominic', lastname: 'Thiem' },
          { id: 25, firstname: 'Bill', lastname: 'Hoover' }
        ];
        result = Player.removeById(38);
      });

      it('returns true', () => {
        expect(result).to.be.true;
      });

      it('deletes the right item from its specified id', () => {
        expect(Player.repository).to.deep.equal([
          { id: 12, firstname: 'Rafael', lastname: 'Nadal' },
          { id: 25, firstname: 'Bill', lastname: 'Hoover' }
        ]);
      });
    });
  });
});
