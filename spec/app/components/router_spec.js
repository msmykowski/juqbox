require('../spec_helper');

describe('Router', () => {
  beforeEach(() => {
    const Router = require('../../../app/components/router');
    const routerProps = {
      router: new MockRouter(),
      playlist: {}
    };

    ReactDOM.render(<Router {...routerProps}/>, root);
  });

  describe('/playlist/:id', () => {
    let PlaylistPage;
    beforeEach(() => {
      PlaylistPage = require('../../../app/components/playlist_page');
      spyOnRender(PlaylistPage);
      MockRouter.navigate(`/playlist/1`);
    });

    it('opens a socket to the server', () => {
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({type: 'socketConnect', data: '1'});
    });

    it('renders the playlistPage', () => {
      expect(PlaylistPage.prototype.render).toHaveBeenCalled();
    });
  });
});
