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

  describe('entries', () => {
    describe('update', () => {
      beforeEach(() => {
        subject.$store = new Cursor({entries: []}, cursorSpy);
        subject.dispatch({type: 'entriesUpdate', data: {id: 1, entries: ['song1', 'song2']}});
      });

      it('updates the song entries', () => {
        expect(cursorSpy).toHaveBeenCalledWith({
          entries: ['song1', 'song2']
        });
      });
    });
  });
});
