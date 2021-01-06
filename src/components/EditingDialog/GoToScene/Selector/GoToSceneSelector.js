import React from 'react';
import PropTypes from 'prop-types';
import SceneList from "../../../ControlBar/SceneSelector/SceneList";
import './GoToSceneSelector.scss';
import {H5PContext} from "../../../../context/H5PContext";

export default class GoToSceneSelector extends React.Component {
  render() {
    return (
      <div className='go-to-scene-selector'>
        <div
          className='go-to-scene-selector-title'
        >{this.context.t('pickAnExistingScene')}:</div>
        <div className='error-message'>{this.context.t('selectASceneError')}</div>
        <SceneList
          scenes={this.props.scenes}
          markedScene={this.props.markedScene}
          onSceneClick={this.props.setNextSceneId.bind(this)}
          isShowingCheck={true}
        />
      </div>
    );
  }
}

GoToSceneSelector.propTypes = {
  scenes: PropTypes.arrayOf(PropTypes.object).isRequired,
  markedScene: PropTypes.number,
  setNextSceneId: PropTypes.func.isRequired,
};

GoToSceneSelector.contextType = H5PContext;