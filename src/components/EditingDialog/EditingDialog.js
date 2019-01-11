import React from 'react';

export default class EditingDialog extends React.Component {
  render() {
    return (
      <div>
        <div>
          <div>Header</div>
          <button onClick={this.props.removeAction.bind(this)}>Remove</button>
          <button onClick={this.props.doneAction.bind(this)}>Done</button>
        </div>
        { this.props.children }
      </div>
    );
  }
}