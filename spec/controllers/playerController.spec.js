const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const rewire = require('rewire');

const sandbox = sinon.createSandbox();
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
  });

  describe('.index', () => {
    context('with an empty database', () => {
      before(async () => {
        await PlayerController.index({}, { status });
      });

      it('returns status 200 with an empty array', () => {
        expect(status).to.have.been.calledWithExactly(200);
        expect(json).to.have.been.calledWithExactly({
          players: []
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
