require('../spec_helper');

describe('PlaylistPage', () => {
  let playlist, props, entries, PlaylistPage;
  beforeEach(() => {
    entries = ['song1', 'song2'];
    playlist = {id: 1, entries};
    props = {playlist};
    PlaylistPage = require('../../../app/components/playlist_page');
    ReactDOM.render(<PlaylistPage {...props}/>, root);
  });

  it('renders the entries list', () => {
    expect('.entries-list').toExist();
    expect('.entry:eq(0)').toContainText('song1');
    expect('.entry:eq(1)').toContainText('song2');
  });

  describe('clicking the add song', () => {
    let newSong;
    beforeEach(() => {
      newSong = 'song3';
      $('.entry-input').val(newSong);
      $('.add-entry').simulate('click');
    });

    it('dispatches a playlist update event', () => {
      expect(Dispatcher.dispatch).toHaveBeenCalledWith({type: 'socketEmitPlaylistUpdate', data: {id: 1, entry: newSong}});
    });
  });

  describe('when the playlist does not exist', () => {
    beforeEach(() => {
      props = {...props, playlist: null};
      ReactDOM.render(<PlaylistPage {...props}/>, root);
    });

    it('renders the playlist does not exist splash page', () => {
      expect('.playlist-does-not-exist').toExist();
    });
  });
});
