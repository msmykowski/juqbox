require('../spec_helper');

describe('SocketDispatcher', () => {
  let subject, Cursor, cursorSpy, connectSpy, onSpy, emitSpy;

  beforeEach(() => {
    Cursor = require('pui-cursor');
    cursorSpy = jasmine.createSpy('callback');
    subject = Dispatcher;
    onSpy = jasmine.createSpy('on');
    emitSpy = jasmine.createSpy('emit');

    const io = require('socket.io-client');
    connectSpy = spyOn(io, 'connect').and.returnValue({on: onSpy, emit: emitSpy});

    //dispatch is spied on in spec_helper
    subject.dispatch.and.callThrough();

    //prevent console logs
    spyOn(subject, 'onDispatch');
  });

  describe('socket', () => {
    describe('connect', () => {
      beforeEach(() => {
        subject.dispatch({type: 'socketConnect', data: '1'});
      });

      it('opens up a connection to the server', () => {
        expect(connectSpy).toHaveBeenCalled();
      });

      it('listens for the connect event', () => {
        expect(onSpy).toHaveBeenCalledWith('connect', jasmine.any(Function));
      });
    });
  });

  describe('playlist', () => {
    describe('update', () => {
      let playlist;
      beforeEach(() => {
        playlist = {id: 1, entries: ['song1', 'song2']};
        subject.$store = new Cursor({playlist: {}}, cursorSpy);
        subject.dispatch({type: 'entriesUpdate', data: playlist});
      });

      it('updates the playlist', () => {
        expect(cursorSpy).toHaveBeenCalledWith({playlist});
      });
    });
  });

  describe('playlist', () => {
    describe('update', () => {
      let playlist;
      beforeEach(() => {
        playlist = {id: 1, entries: ['song1', 'song2', 'song3']};
        subject.dispatch({type: 'socketConnect', data: '1'});
        subject.dispatch({type: 'playlistUpdate', data: playlist});
      });

      it('sends a playlistUpdate event to the server', () => {
        expect(emitSpy).toHaveBeenCalledWith('playlistUpdate', playlist);
      });
    });
  });
});
