import React from 'react';
import SceneSelector from "./SceneSelector";
import {SceneEditingType} from "../EditingDialog/SceneEditor";

export default class ControlBar extends React.Component {
  render() {
    // TODO:  Find a better way to send props to submenu than sending it through
    //        three layers of components, perhaps render sceneselector as
    //        the children prop

    return (
      <div>
        <SceneSelector
          currentScene={this.props.currentScene}
          isSceneUpdated={this.props.isSceneUpdated}
          changeScene={this.props.changeScene}
          editScene={this.props.editScene}
        />
        <button
          onClick={this.props.newScene.bind(this, SceneEditingType.NEW_SCENE)}
        >+ New scene</button>
        <div>TODO: Conditionally render set start position button</div>
      </div>
    );
  }
}
