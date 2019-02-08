import React from 'react';
import PropTypes from 'prop-types';
import './SceneSelectorSubmenu.scss';

const SceneSelectorSubmenu = (props) => (
  <div className='scene-selector-submenu'>
    <button
      className='set-start-scene'
      disabled={props.isStartScene}
      onClick={props.setStartScene.bind(this)}
    >
      <div className='tooltip'>Set as starting scene</div>
    </button>
    <button
      className='jump'
      onClick={props.onJump.bind(this)}
    >
      <div className='tooltip'>Go to scene</div>
    </button>
    <button
      className='edit'
      onClick={props.onEdit.bind(this)}
    >
      <div className='tooltip'>Edit</div>
    </button>
    <button
      className='delete'
      onClick={props.onDelete.bind(this)}
    >
      <div className='tooltip'>Delete</div>
    </button>
  </div>
);

export default SceneSelectorSubmenu;

SceneSelectorSubmenu.propTypes = {
  isStartScene: PropTypes.bool.isRequired,
  setStartScene: PropTypes.func.isRequired,
  onJump: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};