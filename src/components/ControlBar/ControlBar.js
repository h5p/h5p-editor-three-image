import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {SceneEditingType} from "../EditingDialog/SceneEditor";
import './ControlBar.scss';
import {H5PContext} from "../../context/H5PContext";
import {SceneTypes} from "../Scene/Scene";
import {getSceneFromId} from "../../h5phelpers/sceneParams";
import SceneList from "./SceneSelector/SceneList";
import SceneSelectorSubmenu from "./SceneSelector/Row/Submenu/SceneSelectorSubmenu";
import SceneSelector from "./SceneSelector/SceneSelector";

export default class ControlBar extends Component {
  render() {
    const scenes = this.context.params.scenes;
    const scene = getSceneFromId(scenes, this.props.currentScene);
    const is360Scene = scene
      ? scene.sceneType === SceneTypes.THREE_SIXTY_SCENE
      : false;

    return (
      <div className='h5p-control-bar'>
        <SceneSelector
          currentScene={this.props.currentScene}
          isExpanded={this.props.isSceneSelectorExpanded}
          toggleExpand={this.props.toggleExpandSceneSelector.bind(this)}
        >
          <SceneList
            scenes={this.context.params.scenes}
            startScene={this.props.startScene}
            markedScene={this.props.currentScene}
            onTitleClick={this.props.changeScene}
          >
            {(isStartScene, sceneId) => (
              <SceneSelectorSubmenu
                isStartScene={isStartScene}
                setStartScene={this.props.setStartScene.bind(this, sceneId)}
                onJump={this.props.changeScene.bind(this, sceneId)}
                onEdit={this.props.editScene.bind(this, sceneId)}
                onDelete={this.props.deleteScene.bind(this, sceneId)}
              />
            )}
          </SceneList>
        </SceneSelector>
        <button
          className='h5p-new-scene-button'
          onClick={this.props.newScene.bind(this, SceneEditingType.NEW_SCENE)}
        >+ New scene</button>
        {
          is360Scene &&
          <div className={ 'button-wrapper' + (this.props.isInStartingPosition ? '' : ' not-disabled') }>
            <button
              className='set-starting-position-button'
              onClick={ this.props.onSetStartingPosition }
              aria-describedby='set-starting-position-tooltip'
              disabled={ this.props.isInStartingPosition }
            >Set starting position</button>
            <div className="tooltip" id="set-starting-position-tooltip">
              <div className="text-wrapper">Set current camera angle as a starting point for this scene</div>
            </div>
          </div>
        }
      </div>
    );
  }
}

ControlBar.contextType = H5PContext;

ControlBar.propTypes = {
  currentScene: PropTypes.number.isRequired,
  startScene: PropTypes.number.isRequired,
  isSceneSelectorExpanded: PropTypes.bool.isRequired,
  toggleExpandSceneSelector: PropTypes.func.isRequired,
  newScene: PropTypes.func.isRequired,
  onSetStartingPosition: PropTypes.func.isRequired,
  changeScene: PropTypes.func.isRequired,
  setStartScene: PropTypes.func.isRequired,
  editScene: PropTypes.func.isRequired,
  deleteScene: PropTypes.func.isRequired,
};
