import React from 'react';
import {sceneType} from "../../../../types/types";
import './ActiveSceneRow.scss';
import {SceneTypes} from "../../../Scene/Scene";
import PropTypes from 'prop-types';


const ActiveSceneRow = (props) => {
  if (!props.scene) {
    return (
      <div>{props.noScenesTitle}</div>
    );
  }
  const rowClasses = ['active-scene'];
  if (props.scene.sceneType === SceneTypes.THREE_SIXTY_SCENE) {
    rowClasses.push('three-sixty');
  }

  return (
    <div className={rowClasses.join(' ')}>
      <div className='h5p-scene-denotation'>{props.currentSceneLabel}:</div>
      <div className='h5p-scene-name' dangerouslySetInnerHTML={ {__html: props.scene.scenename} }></div>
    </div>
  );
};

ActiveSceneRow.propTypes = {
  scene: sceneType,
  noScenesTitle: PropTypes.string.isRequired,
  currentSceneLabel: PropTypes.string.isRequired
};

export default ActiveSceneRow;