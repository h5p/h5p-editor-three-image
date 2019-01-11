import React from 'react';
import SceneSelector from "./SceneSelector";

export default class ControlBar extends React.Component {
  render() {
    return (
      <div>
        <SceneSelector
          currentScene={this.props.currentScene}
          isSceneInitialized={this.props.isSceneInitialized}
          scenes={this.props.params.scenes}
          changeScene={this.props.changeScene}
        />
        <button onClick={() => this.props.newScene()}>+ New scene</button>
        <div>Conditionally render set start position button</div>
      </div>
    );
  }
}