require('./spec_helper');
const io = require('socket.io-client');

let event, conn, playlist, clientSocket, db;
describe('events', () => {
  beforeAll(async(done) => {
    db = require('../../server/db');
    conn = await db.establishConnection();

    playlist = {id: 1, entries: ['smoothJams', 'marvinGaye']};
    const data = [playlist, {id: 2, entries: ['heavyMetal', 'blink182']}];

    await db.insert({tableName: 'playlists', data}, conn);

    clientSocket = await io.connect(`http://localhost:${process.env.PORT}`);
    clientSocket.on('connect', function() {
      clientSocket.emit('playlistId', 1);
    });

    done();
  });

  afterAll(() => {
    conn.close();
    clientSocket.disconnect();
  });

  describe('on connection', () => {
    beforeEach(async(done) => {
      clientSocket.on('getPlaylist', function(data) {
        event = data;
        done();
      });
    });

    it('returns the playlist contents', () => {
      expect(event).toEqual(playlist);
    });
  });

  describe('on change', () => {
    describe('when a song is added to a playlist', () => {
      beforeEach(async(done) => {
        clientSocket.on('playlistsUpdate1', function(data) {
          event = data;
          done();
        });
        playlist = {id: 1, entries: ['smoothJams', 'marvinGaye', 'newSong']};
        await db.update({tableName: 'playlists', id: 1, data: playlist}, conn);
      });

      it('returns the updated playlist', () => {
        expect(event).toEqual(playlist);
      });
    });

    describe('when a song is removed from a playlist', () => {
      beforeEach(async(done) => {
        clientSocket.on('playlistsUpdate1', function(data) {
          event = data;
          done();
        });
        playlist = {id: 1, entries: ['smoothJams']};
        await db.update({tableName: 'playlists', id: 1, data: playlist}, conn);
      });

      it('returns the updated playlist', () => {
        expect(event).toEqual(playlist);
      });
    });
  });
});
