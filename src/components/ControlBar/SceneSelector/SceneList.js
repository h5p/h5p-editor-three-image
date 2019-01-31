import React, {Component} from 'react';
import SceneRow from "./Row/SceneRow";
import {H5PContext} from "../../../context/H5PContext";

export default class SceneList extends Component {

  render() {
    let previousElementHasTopBorder = false;

    return (
      <div className='h5p-scene-list'>
        {
          this.props.scenes.map(scene => {
            const isStartScene = scene.sceneId === this.props.startScene;
            const isMarkedScene = scene.sceneId === this.props.markedScene;
            let isAfterActiveScene = previousElementHasTopBorder;
            previousElementHasTopBorder = isMarkedScene;

            return (
              <SceneRow
                key={scene.sceneId}
                scene={scene}
                isStartScene={isStartScene}
                isMarkedScene={isMarkedScene}
                isShowingCheck={this.props.isShowingCheck}
                isAfterActiveScene={isAfterActiveScene}
                onTitleClick={() => {
                  this.props.onTitleClick
                  && this.props.onTitleClick(scene.sceneId);
                }}
                onSceneClick={() => {
                  this.props.onSceneClick
                  && this.props.onSceneClick(scene.sceneId);
                }}
              >
                {
                  this.props.children &&
                  this.props.children(isStartScene, scene.sceneId)
                }
              </SceneRow>
            );
          })
        }
      </div>
    );
  }
}

SceneList.contextType = H5PContext;
