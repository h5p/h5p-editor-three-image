import React from 'react';
import PropTypes from 'prop-types';
import SceneList from "../../../ControlBar/SceneSelector/SceneList";
import './GoToSceneSelector.scss';

const GoToSceneSelector = (props) => (
  <div className='go-to-scene-selector'>
    <div
      className='go-to-scene-selector-title'
    >Pick an existing scene to go to:</div>
    <div className='error-message'>Please select a scene</div>
    <SceneList
      scenes={props.scenes}
      markedScene={props.markedScene}
      onSceneClick={props.setNextSceneId.bind(this)}
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