import PropTypes from 'prop-types';
import React from 'react';
import SceneRow from "./Row/SceneRow";

function SceneList(props) {
  let previousElementHasTopBorder = false;

  return (
    <div className='h5p-scene-list'>
      {
        props.scenes.map(scene => {
          const isStartScene = scene.sceneId === props.startScene;
          const isMarkedScene = scene.sceneId === props.markedScene;
          let isAfterActiveScene = previousElementHasTopBorder;
          previousElementHasTopBorder = isMarkedScene;

          return (
            <SceneRow
              key={scene.sceneId}
              scene={scene}
              isStartScene={isStartScene}
              isMarkedScene={isMarkedScene}
              isShowingCheck={props.isShowingCheck}
              isAfterActiveScene={isAfterActiveScene}
              onTitleClick={() => {
                props.onTitleClick
                && props.onTitleClick(scene.sceneId);
              }}
              onSceneClick={() => {
                props.onSceneClick
                && props.onSceneClick(scene.sceneId);
              }}
            >
              {
                props.children &&
                props.children(isStartScene, scene.sceneId)
              }
            </SceneRow>
          );
        })
      }
    </div>
  );
}

SceneList.propTypes = {
  scenes: PropTypes.arrayOf(PropTypes.shape({
    sceneId: PropTypes.number,
  })),
  startScene: PropTypes.number,
  markedScene: PropTypes.number,
  isShowingCheck: PropTypes.bool,
  onTitleClick: PropTypes.func,
  onSceneClick: PropTypes.func,
  children: PropTypes.func,
};

export default SceneList;