const React = require('react');
const {Actions} = require('p-flux');
const HomePage = require('./home_page');
const PlaylistPage = require('./playlist_page');

const types = require('react').PropTypes;

function isObject(obj) {
  return typeof obj === 'object';
}

function toFlattenedRoutes(routesHash) {
  return Object.keys(routesHash).reduce((paths, parent) => {
    if (isObject(routesHash[parent])) {
      const children = toFlattenedRoutes(routesHash[parent]);
      Object.keys(children).forEach(child => paths[parent + child] = children[child]);
    } else {
      paths[parent] = routesHash[parent];
    }
    return paths;
  }, {});
}

const routes = {
  '/': 'root',
  '/playlist/:id': 'playlistPage',
};

class Router extends React.Component {
  static propTypes = {
    router: types.oneOfType([types.object, types.func])
  };

  constructor(props, context) {
    super(props, context);
    const {state} = this;
    this.state = {...state, Page: null };
  }

  componentDidMount() {
    const {router} = this.props;
    Object.entries(toFlattenedRoutes(routes)).map(([path, callbackName]) => {
      router.get(path, this[callbackName]);
    });
  }

  root = () => {
    this.setState({Page: HomePage});
  };

  playlistPage = ({params: {id}}) => {
    Actions.socketConnect(id);
    this.setState({Page: PlaylistPage});
  };

  render() {
    const {Page} = this.state;
    if (!Page) return null;
    
    return (
      <Page {...this.props}/>
    );
  }
}

module.exports = Router;
