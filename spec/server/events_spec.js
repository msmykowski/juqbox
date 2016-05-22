require('./spec_helper');
const io = require('socket.io-client');
const db = require('../../server/db');

let event, playlist, clientSocket;
describe('events', () => {
  beforeAll(async(done) => {
    playlist = {id: 1, entries: ['smoothJams', 'marvinGaye']};
    const data = [playlist, {id: 2, entries: ['heavyMetal', 'blink182']}];

    await db.insert({tableName: 'playlists', data});

    clientSocket = await io.connect(`http://localhost:${process.env.PORT}`);
    clientSocket.on('connect', function() {
      clientSocket.emit('playlistId', 1);
      done();
    });
  });

  afterEach(async(done) => {
    playlist = {id: 1, entries: ['smoothJams', 'marvinGaye']};
    await db.update({tableName: 'playlists', id: 1, data: playlist});
    done();
  });

  afterAll(() => {
    clientSocket.disconnect();
  });

  describe('on connection', () => {
    beforeEach(async(done) => {
      clientSocket.on('playlists1', function(data) {
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
        clientSocket.on('playlists1', function(data) {
          event = data;
          done();
        });
        playlist = {id: 1, entries: ['smoothJams', 'marvinGaye', 'newSong']};
        await db.update({tableName: 'playlists', id: 1, data: playlist});
      });

      it('returns the updated playlist', () => {
        expect(event).toEqual(playlist);
      });
    });

    describe('when a song is removed from a playlist', () => {
      beforeEach(async(done) => {
        clientSocket.on('playlists1', function(data) {
          event = data;
          done();
        });
        playlist = {id: 1, entries: ['smoothJams']};
        await db.update({tableName: 'playlists', id: 1, data: playlist});
      });

      it('returns the updated playlist', () => {
        expect(event).toEqual(playlist);
      });
    });
  });

  describe('playlistUpdate', () => {
    let newSong;
    beforeEach(async(done) => {
      newSong = 'newSong';
      clientSocket.emit('playlistUpdate', {id: 1, entry: newSong});
      done();
    });

    it('updates the playlist', async(done) => {
      setTimeout(async() => {
        const dbPlaylist = await db.get({tableName: 'playlists', id: 1});
        playlist = {id: 1, entries: ['smoothJams', 'marvinGaye', newSong]};
        expect(dbPlaylist).toEqual(playlist);
        done();
      }, 1000);
    });
  });
});
