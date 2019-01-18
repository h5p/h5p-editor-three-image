import React from 'react';
import {H5PContext} from "../../context/H5PContext";

export default class SceneSelector extends React.Component {
  handleSelectedScene(e) {
    const sceneIndex = parseInt(e.target.value);
    this.props.changeScene(sceneIndex);
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
        <select
          value={this.props.currentScene}
          onChange={this.handleSelectedScene.bind(this)}
        >
          {
            scenes.map((scene, sceneIndex) => {
              return (
                <option
                  value={sceneIndex}
                  key={scene.scenename} // TODO: Unique ID
                >{scene.scenename}</option>
              );
            })
          }
        </select>
      </div>
    );
  }
}

SceneSelector.contextType = H5PContext;