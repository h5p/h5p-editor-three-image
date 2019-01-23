import React from 'react';
import './EditingDialog.scss';

export default class EditingDialog extends React.Component {
  render() {
    const titleClasses = [
      'title',
      ...this.props.titleClasses || [],
    ];

    return (
      <div className='h5p-editing-overlay'>
        <div className='h5p-editing-dialog'>
          <div className='h5p-editing-dialog-header'>
            <div className={titleClasses.join(' ')}
            >{this.props.title || ''}</div>
            <div className='h5p-editing-dialog-button-row'>
              <button
                className='remove-button'
                onClick={this.props.removeAction.bind(this)}
              >Remove</button>
              <button
                className='done-button'
                onClick={this.props.doneAction.bind(this)}
              >Done</button>
            </div>
          </div>
          <div className='h5p-editing-dialog-body'>
            { this.props.children }
          </div>
        </div>
      </div>
    );
  }
}