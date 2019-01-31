import React from 'react';
import {H5PContext} from "../../../context/H5PContext";
import './SceneSelector.scss';
import {ActiveSceneRow} from "./Row/ActiveSceneRow";
import ExpandedSceneSelector from "./ExpandedSceneSelector";
import SceneSelectorSubmenu from "./Row/Submenu/SceneSelectorSubmenu";
import SceneList from "./SceneList";

export default class SceneSelector extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false,
    };
  }

  render() {
    const scenes = this.context.params.scenes;
    const activeScene = scenes.find(scene => {
      return scene.sceneId === this.props.currentScene;
    });

    const sceneSelectorClasses = ['h5p-scene-selector'];
    if (!activeScene) {
      sceneSelectorClasses.push('disabled');
    }

    return (
      <div className='scene-selector-wrapper'>
        <div
          className={sceneSelectorClasses.join(' ')}
          onClick={this.props.toggleExpand.bind(this, undefined)}
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
          this.props.isExpanded &&
          <ExpandedSceneSelector>
            <SceneList
              scenes={this.context.params.scenes}
              startScene={this.props.startScene}
              markedScene={this.props.currentScene}
              onTitleClick={this.props.changeScene}
            >
              {(isStartScene, sceneId) => (
                <SceneSelectorSubmenu
                  isStartScene={isStartScene}
                  setStartScene={this.props.setStartScene.bind(this, sceneId)}
                  onJump={this.props.changeScene.bind(this, sceneId)}
                  onEdit={this.props.editScene.bind(this, sceneId)}
                  onDelete={this.props.deleteScene.bind(this, sceneId)}
                />
              )}
            </SceneList>
          </ExpandedSceneSelector>
        }
      </div>
    );
  }
}

SceneSelector.contextType = H5PContext;