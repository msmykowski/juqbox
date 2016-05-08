const React = require('react');
const {Actions} = require('p-flux');

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
};

class Router extends React.Component {
  static propTypes = {
    router: types.oneOfType([types.object, types.func])
  };

  constructor() {
    super();
    Actions.socketConnect();
  }

  componentDidMount() {
    const {router} = this.props;
    Object.entries(toFlattenedRoutes(routes)).map(([path, callbackName]) => {
      router.get(path, this[callbackName]);
    });
  }
  root = () => {
  };

  render() {
    return null;
  }
}

module.exports = Router;
