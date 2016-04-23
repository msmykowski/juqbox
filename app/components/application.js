require('babel-polyfill');
const Bootstrap = require('../bootstrap');
const React = require('react');
const types = React.PropTypes;
const {useStore} = require('p-flux');
const {useRouter} = require('./use_router');
const Router = require('./router');
const io = require('socket.io-client');

class Application extends React.Component {
  constructor(props) {
    super(props);
    const socket = io.connect('http://localhost:3000', {reconnect: true});
    socket.on('connect', function(socket) {
      console.log('Connected!');
    });
  }

  static propTypes = {
    config: types.object.isRequired,
    store: types.object.isRequired,
    router: types.oneOfType([types.object, types.func])
  };

  render() {
    const {config, store, router} = this.props;
    return (
      <div className="pui-react-starter">
        <a href="todoList" onClick={e => {e.preventDefault(); router.navigate('/todoList');}}>Todo List!</a>
        <br/>
        <a href="createNewUser" onClick={e => {e.preventDefault(); router.navigate('/users/new');}}>Create New User</a>
        <br/>
        <a href="userList" onClick={e => {e.preventDefault(); router.navigate('/users/list');}}> All Users</a>
        <Router {...{router, config, ...store}}/>
      </div>
    );
  }
}

const EnhancedApplication = useStore(useRouter(Application),
  {
    store: require('../store'),
    actions: [],
    dispatcherHandlers: [require('../dispatchers/main_dispatcher')],
    /* eslint-disable no-console */
    onDispatch: (event) => {console.info('dispatching event', event);}
    /* eslint-enable no-console */
  }
);

Bootstrap.init(EnhancedApplication);

module.exports = EnhancedApplication;
