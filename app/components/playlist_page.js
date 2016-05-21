const React = require('react');
const types = require('react').PropTypes;
const {Actions} = require('p-flux');

class PlaylistPage extends React.Component {
  static propTypes = {
    playlist: types.object
  };

  onClick = () => {
    const addedEntry = this._input.value;
    const {playlist={}} = this.props;
    const {entries} = playlist;
    Actions.playlistUpdate({...playlist, entries: [...entries, addedEntry]});
  }

  render() {
    const {playlist: {entries}={}} = this.props;
    const entriesList = entries && entries.map((entry, i) => <div className="entry" key={i}>{entry}</div>);
    return (
      <div>
        <input name="entry-input" className="entry-input" ref={(c) => this._input = c}/>
        <button className="add-entry" onClick={this.onClick}>Add Entry</button>
        <div className="entries-list">
          {entriesList}
        </div>
      </div>
    );
  }
}

module.exports = PlaylistPage;