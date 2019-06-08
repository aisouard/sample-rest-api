const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

const sandbox = sinon.createSandbox();
const Player = require('../helpers/fakePlayer')(sandbox);

const { expect } = chai;
chai.use(sinonChai);

describe('PlayerController', () => {
  let PlayerController;
  let status;
  let json;

  before(() => {
    json = sandbox.stub();
    status = sandbox.stub().returns({ json });

    PlayerController = rewire('../../app/controllers/playerController');
    PlayerController.__set__('Player', Player);
  });

  describe('.index', () => {
    context('with an empty database', () => {
      before(async () => {
        Player.findAll.returns([]);
        await PlayerController.index({}, { status });
      });

      after(() => {
        sandbox.resetHistory();
      });

      it('returns status 200 with an empty array', () => {
        expect(status).to.have.been.calledWithExactly(200);
        expect(json).to.have.been.calledWithExactly({
          players: []
        });
      });
    });

    context('with a database containing some players', () => {
      before(async () => {
        Player.findAll.returns([
          { id: 32, firstname: 'John', lastname: 'Smith' },
          { id: 58, firstname: 'William', lastname: 'Doe' }
        ]);
        await PlayerController.index({}, { status });
      });

      after(() => {
        sandbox.resetHistory();
      });

      it('returns status 200 with the retrieved data', () => {
        expect(status).to.have.been.calledWithExactly(200);
        expect(json).to.have.been.calledWithExactly({
          players: [
            { id: 32, firstname: 'John', lastname: 'Smith' },
            { id: 58, firstname: 'William', lastname: 'Doe' }
          ]
        });
      });
    });
  });

  describe('.get', () => {
    context('with an unknown player id', () => {
      before(async () => {
        await PlayerController.get({ body: { id: 24 } }, { status });
      });

      it('returns status 404 with an empty body', () => {
        expect(status).to.have.been.calledWithExactly(404);
        expect(json).to.have.been.calledWithExactly(null);
      });
    });
  });

  describe('.delete', () => {
    context('with an unknown player id', () => {
      before(async () => {
        await PlayerController.delete({ body: { id: 24 } }, { status });
      });

      it('returns status 404 with an empty body', async () => {
        expect(status).to.have.been.calledWithExactly(404);
        expect(json).to.have.been.calledWithExactly(null);
      });
    });
  });
});
