import React from 'react';
import {H5PContext} from "../../context/H5PContext";
import SceneSelectorSubmenu from "./SceneSelectorSubmenu";

export default class SceneSelector extends React.Component {
  setStartScene(scene) {
    this.props.setStartScene(scene.sceneId);
  }

  render() {
    if (this.props.currentScene === null) {
      return (
        <div>
          <select disabled="disabled">
            <option>No scenes</option>
          </select>
        </div>
      );
    }
    const scenes = this.context.params.scenes;

    return (
      <div>
        <div>
          {
            scenes.map(scene => {
              return (
                // TODO: Unique ID
                <div key={scene.scenename}>
                  <div>{scene.scenename}</div>
                  {
                    this.props.startScene === scene.sceneId &&
                    <div>(Starting scene)</div>
                  }
                  <SceneSelectorSubmenu
                    setStartScene={this.setStartScene.bind(this, scene)}
                    onJump={this.props.changeScene.bind(this, scene.sceneId)}
                    onEdit={this.props.editScene.bind(this, scene.sceneId)}
                  />
                </div>
              );
            })
          }
        </div>
      </div>
    );
  }
}

SceneSelector.contextType = H5PContext;