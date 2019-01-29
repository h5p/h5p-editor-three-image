import React from 'react';
import {H5PContext} from "../../../context/H5PContext";
import './SceneSelector.scss';
import {ActiveSceneRow} from "./Row/ActiveSceneRow";
import ExpandedSceneSelector from "./ExpandedSceneSelector";

export default class SceneSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
  }

  setStartScene(scene) {
    this.props.setStartScene(scene.sceneId);
  }

  getActiveScene() {
    const scenes = this.context.params.scenes;

    return scenes.find(scene => {
      return scene.sceneId === this.props.currentScene;
    });
  }

  toggleExpanded() {
    // Disabled
    if (!this.getActiveScene()) {
      return;
    }

    this.setState((prevState) => {
      return {
        isExpanded: !prevState.isExpanded,
      };
    });

    this.props.toggleSceneOverlay();
  }

  changeScene(sceneId) {
    this.toggleExpanded();
    this.props.changeScene(sceneId);
  }

  render() {
    const activeScene = this.getActiveScene();

    const sceneSelectorClasses = ['h5p-scene-selector'];
    if (!activeScene) {
      sceneSelectorClasses.push('disabled');
    }

    return (
      <div className='scene-selector-wrapper'>
        <div
          className={sceneSelectorClasses.join(' ')}
          onClick={this.toggleExpanded.bind(this)}
        >
          <div className='h5p-select-content'>
            <ActiveSceneRow
              scene={activeScene}
              simpleView={true}
            />
          </div>
          <div className='h5p-select-handle'/>

        </div>
        {
          this.state.isExpanded &&
          <ExpandedSceneSelector
            startScene={this.props.startScene}
            currentScene={this.props.currentScene}
            setStartScene={this.setStartScene.bind(this)}
            changeScene={this.changeScene.bind(this)}
            editScene={this.props.editScene}
            deleteScene={this.props.deleteScene}
          />
        }
      </div>
    );
  }
}

SceneSelector.contextType = H5PContext;