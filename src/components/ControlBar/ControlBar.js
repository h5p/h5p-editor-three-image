import React from 'react';
import SceneSelector from "./SceneSelector/SceneSelector";
import {SceneEditingType} from "../EditingDialog/SceneEditor";
import './ControlBar.scss';
import {H5PContext} from "../../context/H5PContext";
import {SceneTypes} from "../Scene/Scene";

export default class ControlBar extends React.Component {
  render() {
    // TODO:  Find a better way to send props to submenu than sending it through
    //        three layers of components, perhaps render sceneselector as
    //        the children prop

    const scene = this.context.params.scenes.find(scene => {
      return scene.sceneId === this.props.currentScene;
    });
    const is360Scene = scene
      ? scene.sceneType === SceneTypes.THREE_SIXTY_SCENE
      : false;

    return (
      <div className='h5p-control-bar'>
        <SceneSelector
          currentScene={this.props.currentScene}
          isSceneUpdated={this.props.isSceneUpdated}
          changeScene={this.props.changeScene}
          editScene={this.props.editScene}
          deleteScene={this.props.deleteScene}
          setStartScene={this.props.setStartScene}
          startScene={this.props.startScene}
          toggleSceneOverlay={this.props.toggleSceneOverlay}
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