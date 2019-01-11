import React from 'react';

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

    return (
      <div>
        <select
          value={this.props.currentScene}
          onChange={this.handleSelectedScene.bind(this)}
        >
          {
            this.props.scenes.map((scene, sceneIndex) => {
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