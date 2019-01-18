import React from 'react';

export default class SceneSelectorSubmenu extends React.Component {

  onDelete() {
    console.log("TODO: Deleting scene");
  }

  render() {
    return (
      <div>
        <button onClick={this.props.onJump.bind(this)}>Jump</button>
        <button onClick={this.props.onEdit.bind(this)}>Edit</button>
        <button onClick={this.onDelete.bind(this)}>Delete</button>
      </div>
    );
  }
}