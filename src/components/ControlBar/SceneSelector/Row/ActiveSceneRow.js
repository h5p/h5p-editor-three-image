import React from 'react';
import {sceneType} from "../../../../types/types";
import './ActiveSceneRow.scss';
import {SceneTypes} from "../../../Scene/Scene";
import {H5PContext} from "../../../../context/H5PContext";

export default class ActiveSceneRow extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if (!this.props.scene) {
      return (
        <div>{this.context.t('noScenesTitle')}</div>
      );
    }
  
    const rowClasses = ['active-scene'];
    if (this.props.scene.sceneType === SceneTypes.THREE_SIXTY_SCENE) {
      rowClasses.push('three-sixty');
    }
  
    return (
      <div className={rowClasses.join(' ')}>
        <div className='h5p-scene-denotation'>{this.context.t('currentScene')}:</div>
        <div className='h5p-scene-name' dangerouslySetInnerHTML={ {__html: this.props.scene.scenename} }></div>
      </div>
    );
  }
}

ActiveSceneRow.contextType = H5PContext;

ActiveSceneRow.propTypes = {
  scene: sceneType,
};