import React from 'react';
import PropTypes from 'prop-types';
import './EditingDialog.scss';
import { H5PContext } from '../../context/H5PContext';

export default class EditingDialog extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const titleClasses = [
      'title',
      this.props.titleClasses || [],
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
              >{this.context.t('remove')}</button>
              <button
                className='done-button'
                onClick={this.props.doneAction.bind(this)}
              >{this.context.t('done')}</button>
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

EditingDialog.contextType = H5PContext;


EditingDialog.propTypes = {
  titleClasses: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  removeAction: PropTypes.func.isRequired,
  doneAction: PropTypes.func.isRequired,
  children: PropTypes.node,
};