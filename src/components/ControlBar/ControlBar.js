import React from 'react';
import SceneSelector from "./SceneSelector";

export default class ControlBar extends React.Component {
  render() {
    // TODO:  Find a better way to send props to submenu than sending it through
    //        three layers of components..

    return (
      <div>
        <SceneSelector
          currentScene={this.props.currentScene}
          isSceneInitialized={this.props.isSceneInitialized}
          changeScene={this.props.changeScene}
          editScene={this.props.editScene}
        />
        <button onClick={() => this.props.newScene()}>+ New scene</button>
        <div>TODO: Conditionally render set start position button</div>
      </div>
    );
  }
}
