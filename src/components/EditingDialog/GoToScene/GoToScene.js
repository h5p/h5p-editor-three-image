import React, {Component} from 'react';
import {H5PContext} from "../../../context/H5PContext";
import SceneList from "../../ControlBar/SceneSelector/SceneList";
import './GoToScene.scss';

export default class GoToScene extends Component {
  constructor(props) {
    super(props);

    this.state = {
      markedScene: parseInt(this.props.params.action.params.nextSceneId),
    };
  }

  setNextSceneId(sceneId) {
    // Update number widget and params
    const nextSceneIdWidget = this.props.nextSceneIdWidget;
    nextSceneIdWidget.$input.val(sceneId);
    this.props.params.action.params.nextSceneId = sceneId;
    this.props.selectedScene();

    this.setState({
      markedScene: sceneId,
    });
  }

  render() {
    // Filter out current scene
    const scenes = this.context.params.scenes.filter(scene => {
      return scene.sceneId !== this.props.currentScene;
    });

    const sceneClasses = ['go-to-scene-selector'];
    if (this.props.hasInputError) {
      sceneClasses.push('has-error');
    }

    return (
      <div className={sceneClasses.join(' ')}>
        <div className='error-message'>Please select a scene</div>
        <SceneList
          scenes={scenes}
          markedScene={this.state.markedScene}
          onSceneClick={this.setNextSceneId.bind(this)}
          isShowingCheck={true}
        />
      </div>
    );
  }
}

GoToScene.contextType = H5PContext;