import React from 'react';
import {H5PContext} from "../../context/H5PContext";
import SceneSelectorSubmenu from "./SceneSelectorSubmenu";

export default class SceneSelector extends React.Component {
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
            scenes.map((scene, sceneIndex) => {
              return (
                // TODO: Unique ID
                <div key={scene.scenename}>
                  <div>{scene.scenename}</div>
                  <SceneSelectorSubmenu
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