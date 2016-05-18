require('../spec_helper');

describe('PlaylistPage', () => {
  beforeEach(() => {
    const entries = ['song1', 'song2'];
    const props = {entries};
    const PlaylistPage = require('../../../app/components/playlist_page');
    ReactDOM.render(<PlaylistPage {...props}/>, root);
  });

  it('renders the entries list', () => {
    expect('.entries-list').toExist();
    expect('.entry:eq(0)').toContainText('song1');
    expect('.entry:eq(1)').toContainText('song2');
  });
});
