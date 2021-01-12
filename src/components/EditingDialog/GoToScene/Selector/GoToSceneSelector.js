import React from 'react';
import PropTypes from 'prop-types';
import SceneList from "../../../ControlBar/SceneSelector/SceneList";
import './GoToSceneSelector.scss';

const GoToSceneSelector = (props) => (
  <div className='go-to-scene-selector'>
    <div
      className='go-to-scene-selector-title'
    >{props.pickAnExistingScene}:</div>
    <div className='error-message'>{props.selectASceneError}</div>
    <SceneList
      scenes={this.props.scenes}
      markedScene={this.props.markedScene}
      onSceneClick={this.props.setNextSceneId.bind(this)}
      isShowingCheck={true}
    />
  </div>
);

GoToSceneSelector.propTypes = {
  scenes: PropTypes.arrayOf(PropTypes.object).isRequired,
  markedScene: PropTypes.number,
  setNextSceneId: PropTypes.func.isRequired,
};

export default GoToSceneSelector;