import React from 'react';
import SceneSelector from "./SceneSelector/SceneSelector";
import {SceneEditingType} from "../EditingDialog/SceneEditor";
import './ControlBar.scss';
import {H5PContext} from "../../context/H5PContext";
import {SceneTypes} from "../Scene/Scene";
import {getSceneFromId} from "../../h5phelpers/sceneParams";

export default class ControlBar extends React.Component {
  render() {
    // TODO:  Find a better way to send props to submenu than sending it through
    //        three layers of components, perhaps render sceneselector as
    //        the children prop

    const scenes = this.context.params.scenes;
    const scene = getSceneFromId(scenes, this.props.currentScene);
    const is360Scene = scene
      ? scene.sceneType === SceneTypes.THREE_SIXTY_SCENE
      : false;

    return (
      <div className='h5p-control-bar'>
        <SceneSelector
          currentScene={this.props.currentScene}
          changeScene={this.props.changeScene}
          editScene={this.props.editScene}
          deleteScene={this.props.deleteScene}
          setStartScene={this.props.setStartScene}
          startScene={this.props.startScene}
          toggleSceneOverlay={this.props.toggleSceneOverlay}
          isExpanded={this.props.isSceneSelectorExpanded}
          toggleExpand={this.props.toggleExpandSceneSelector}
        />
        <button
          className='h5p-new-scene-button'
          onClick={this.props.newScene.bind(this, SceneEditingType.NEW_SCENE)}
        >+ New scene</button>
        {
          is360Scene &&
          <button
            className='h5p-set-starting-position-button'
            onClick={this.props.setStartPosition}
          >Set starting position</button>
        }
      </div>
    );
  }
}

ControlBar.contextType = H5PContext;