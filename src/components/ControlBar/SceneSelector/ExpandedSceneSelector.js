import React, {Component} from 'react';
import {H5PContext} from "../../../context/H5PContext";
import './ExpandedSceneSelector.scss';
import SceneRow from "./Row/SceneRow";

export default class ExpandedSceneSelector extends Component {
  render() {
    const scenes = this.context.params.scenes;
    let previousElementHasTopBorder = false;

    return (
      <div className='expanded-scene-selector'>
        <div className='header'>
          <div className='title'>Choose a scene</div>
        </div>
        {
          scenes.map(scene => {
            const isStartScene = scene.sceneId === this.props.startScene;
            let isAfterStartScene = previousElementHasTopBorder;
            previousElementHasTopBorder = isStartScene;

            return (
              <SceneRow
                key={scene.sceneId}
                scene={scene}
                isStartScene={isStartScene}
                isAfterStartScene={isAfterStartScene}
                setStartScene={this.props.setStartScene.bind(this)}
                changeScene={this.props.changeScene}
                editScene={this.props.editScene}
              />
            );
          })
        }
      </div>
    );
  }
}

ExpandedSceneSelector.contextType = H5PContext;
