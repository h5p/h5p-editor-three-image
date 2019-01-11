import React from 'react';

export default class ControlBar extends React.Component {
  render() {
    return (
      <div>
        <div>Placeholder scene selector</div>
        <button onClick={() => this.props.newScene()}>+ New scene</button>
        <div>Conditionally render set start position button</div>
      </div>
    );
  }
}