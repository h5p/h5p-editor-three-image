import React from 'react';
import PropTypes from 'prop-types';
import './SceneSelectorSubmenu.scss';
import {H5PContext} from "../../../../../context/H5PContext";


export default class SceneSelectorSubmenu extends React.Component {

  handleClick = (type) => {
    return (e) => {
      e.stopPropagation();
      this.props[type]();
    }
  }

  render() {
    return (
      <div className='scene-selector-submenu'>
        <button
          className='set-start-scene'
          disabled={this.props.isStartScene}
          onClick={ this.handleClick('setStartScene') }
        >
          <div className='tooltip'>{this.context.t('setStartingScene')}</div>
        </button>
        <button
          className='jump'
          onClick={ this.handleClick('onJump') }
        >
          <div className='tooltip'>{this.context.t('goToScene')}</div>
        </button>
        <button
          className='edit'
          onClick={ this.handleClick('onEdit') }
        >
          <div className='tooltip'>{this.context.t('edit')}</div>
        </button>
        <button
          className='delete'
          onClick={ this.handleClick('onDelete') }
        >
          <div className='tooltip'>{this.context.t('delete')}</div>
        </button>
      </div>
    );
  }
}

SceneSelectorSubmenu.contextType = H5PContext;

SceneSelectorSubmenu.propTypes = {
  isStartScene: PropTypes.bool.isRequired,
  setStartScene: PropTypes.func.isRequired,
  onJump: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
