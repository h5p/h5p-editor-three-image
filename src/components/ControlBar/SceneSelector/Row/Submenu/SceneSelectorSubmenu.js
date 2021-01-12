import React from 'react';
import PropTypes from 'prop-types';
import './SceneSelectorSubmenu.scss';

const SceneSelectorSubmenu = (props) => {

  /**
   * TODO: Use separate <Button> component for mapping instead.
   */

  const handleClick = (type) => {
    return (e) => {
      e.stopPropagation();
      props[type]();
    }
  }

  return (
    <div className='scene-selector-submenu'>
      <button
        className='set-start-scene'
        disabled={props.isStartScene}
        onClick={ handleClick('setStartScene') }
      >
        <div className='tooltip'>{props.setStartingSceneLabel}</div>
      </button>
      <button
        className='jump'
        onClick={ handleClick('onJump') }
      >
        <div className='tooltip'>{props.goToSceneLabel}</div>
      </button>
      <button
        className='edit'
        onClick={ handleClick('onEdit') }
      >
        <div className='tooltip'>{props.editLabel}</div>
      </button>
      <button
        className='delete'
        onClick={ handleClick('onDelete') }
      >
        <div className='tooltip'>{props.deleteLabel}</div>
      </button>
    </div>
  );
};

SceneSelectorSubmenu.propTypes = {
  isStartScene: PropTypes.bool.isRequired,
  setStartScene: PropTypes.func.isRequired,
  onJump: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  setStartingSceneLabel: PropTypes.string.isRequired,
  goToSceneLabel: PropTypes.string.isRequired,
  editLabel: PropTypes.string.isRequired,
  deleteLabel: PropTypes.string.isRequired
};

export default SceneSelectorSubmenu;