require('../spec_helper');

describe('Router', () => {
  beforeEach(() => {
    const Router = require('../../../app/components/router');
    const routerProps = {
      router: new MockRouter(),
    };

    ReactDOM.render(<Router {...routerProps}/>, root);
  });

  describe('/playlist/:id', () => {
    beforeEach(() => {
      MockRouter.navigate(`/playlist/1`);
    });

    it('opens a socket to the server', () => {
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({type: 'socketConnect', data: '1'});
    });
  });
});
