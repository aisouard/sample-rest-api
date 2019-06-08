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
  let send;
  let status;
  let json;

  before(() => {
    json = sandbox.stub();
    send = sandbox.stub();
    status = sandbox.stub().returns({ json, send });

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
        expect(Player.findAll).to.have.been.calledOnce;
        expect(status).to.have.been.calledWithExactly(200);
        expect(json).to.have.been.calledWithExactly([]);
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
        expect(Player.findAll).to.have.been.calledOnce;
        expect(status).to.have.been.calledWithExactly(200);
        expect(json).to.have.been.calledWithExactly([
          { id: 32, firstname: 'John', lastname: 'Smith' },
          { id: 58, firstname: 'William', lastname: 'Doe' }
        ]);
      });
    });
  });

  describe('.get', () => {
    context('with an unknown player id', () => {
      before(async () => {
        Player.findById.withArgs(24).returns(null);
        await PlayerController.get({ params: { id: 24 } }, { status });
      });

      after(() => {
        sandbox.resetHistory();
      });

      it('returns status 404 with an empty body', () => {
        expect(Player.findById).to.have.been.calledOnceWithExactly(24);
        expect(status).to.have.been.calledOnceWithExactly(404);
        expect(send).to.have.been.calledOnceWithExactly();
      });
    });

    context('with a known player id', () => {
      before(async () => {
        Player.findById.withArgs(32).returns({ id: 32, firstname: 'John', lastname: 'Smith' });
        await PlayerController.get({ params: { id: 32 } }, { status });
      });

      after(() => {
        sandbox.resetHistory();
      });

      it('returns status 200 with the retrieved data', () => {
        expect(Player.findById).to.have.been.calledOnceWithExactly(32);
        expect(status).to.have.been.calledWithExactly(200);
        expect(json).to.have.been.calledWithExactly({ id: 32, firstname: 'John', lastname: 'Smith' });
      });
    });
  });

  describe('.delete', () => {
    context('with an unknown player id', () => {
      before(async () => {
        Player.removeById.withArgs(58).returns(false);
        await PlayerController.delete({ params: { id: 58 } }, { status, status });
      });

      after(() => {
        sandbox.resetHistory();
      });

      it('returns status 404 with an empty body', async () => {
        expect(Player.removeById).to.have.been.calledOnceWithExactly(58);
        expect(status).to.have.been.calledWithExactly(404);
        expect(send).to.have.been.calledOnceWithExactly();
      });
    });

    context('with a known player id', () => {
      before(async () => {
        Player.removeById.withArgs(77).returns(true);
        await PlayerController.delete({ params: { id: 77 } }, { status, status });
      });

      after(() => {
        sandbox.resetHistory();
      });

      it('returns status 204 with an empty body', async () => {
        expect(Player.removeById).to.have.been.calledOnceWithExactly(77);
        expect(status).to.have.been.calledWithExactly(204);
        expect(send).to.have.been.calledOnceWithExactly();
      });
    });
  });
});
