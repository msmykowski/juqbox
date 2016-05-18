const React = require('react');
const types = require('react').PropTypes;

class PlaylistPage extends React.Component {
  static propTypes = {
    entries: types.array
  };

  render() {
    const {entries} = this.props;
    const entriesList = entries && entries.map((entry, i) => <div className="entry" key={i}>{entry}</div>);
    return (<div className="entries-list">{entriesList}</div>);
  }
}

module.exports = PlaylistPage;
