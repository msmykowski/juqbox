require('./spec_helper');
const io = require('socket.io-client');

let event, conn, playlist, socket;

describe('on connection', () => {
  beforeEach(async(done) => {
    const db = require('../../server/db');

    playlist = {id: 1, entries: ['smoothJams', 'marvinGaye']};
    const data = [playlist, {id: 2, entries: ['heavyMetal', 'blink182']}];

    const conn = await db.establishConnection();
    db.insert({tableName: 'playlists', data}, conn);

    socket = await io.connect('http://localhost:3000');
    socket.on('connect', function() {
      socket.emit('playlistId', 1);
    });
    socket.on('getPlaylist', function(data) {
      event = data;
      done();
    });
  });

  afterAll(() => {
    conn.close();
    socket.disconnect();
  });

  it('returns the playlist contents', () => {
    expect(event).toEqual(playlist);
  });
});
