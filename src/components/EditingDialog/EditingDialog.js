import React from 'react';
import PropTypes from 'prop-types';
import './EditingDialog.scss';

const EditingDialog = (props) => {
  const titleClasses = [
    'title',
    ...props.titleClasses || [],
  ];

  return (
    <div className='h5p-editing-overlay'>
      <div className='h5p-editing-dialog'>
        <div className='h5p-editing-dialog-header'>
          <div className={titleClasses.join(' ')}
          >{props.title || ''}</div>
          <div className='h5p-editing-dialog-button-row'>
            <button
              className='remove-button'
              onClick={props.removeAction.bind(this)}
            >{props.removeLabel}</button>
            <button
              className='done-button'
              onClick={props.doneAction.bind(this)}
            >{props.doneLabel}</button>
          </div>
        </div>
        <div className='h5p-editing-dialog-body'>
          {props.children}
        </div>
      </div>
    </div>
  );
};

EditingDialog.propTypes = {
  titleClasses: PropTypes.arrayOf(PropTypes.string),
  title: PropTypes.string,
  removeAction: PropTypes.func.isRequired,
  doneAction: PropTypes.func.isRequired,
  children: PropTypes.node,
  removeLabel: PropTypes.string.isRequired,
  doneLabel: PropTypes.string.isRequired

};

export default EditingDialog;