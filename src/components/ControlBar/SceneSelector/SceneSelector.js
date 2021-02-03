import React from 'react';
import PropTypes from 'prop-types';
import {H5PContext} from "../../../context/H5PContext";
import './SceneSelector.scss';
import ActiveSceneRow from "./Row/ActiveSceneRow";
import ExpandedSceneSelector from "./ExpandedSceneSelector";

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
          id='scene-selector'
          className={sceneSelectorClasses.join(' ')}
          onClick={this.props.toggleExpand.bind(this, undefined)}
        >
          <div className='h5p-select-content'>
            <ActiveSceneRow
              noScenesTitle={this.context.t('noScenesTitle')}
              currentSceneLabel={this.context.t('currentScene')}
              scene={activeScene}
              simpleView={true}
            />
          </div>
          <div className='h5p-select-handle'/>

        </div>
        {
          this.props.isExpanded &&
          <ExpandedSceneSelector chooseSceneLabel={this.context.t('chooseScene')}>
            {this.props.children}
          </ExpandedSceneSelector>
        }
      </div>
    );
  }
}

SceneSelector.contextType = H5PContext;

SceneSelector.propTypes = {
  currentScene: PropTypes.number,
  isExpanded: PropTypes.bool,
  toggleExpand: PropTypes.func.isRequired,
  children: PropTypes.node,
};
