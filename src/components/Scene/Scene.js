import React from 'react';
import PropTypes from 'prop-types';
import NoScene from "./NoScene";
import './Scene.scss';
import {H5PContext} from "../../context/H5PContext";
import {initializeThreeSixtyPreview} from "../../h5phelpers/h5pComponents";

export const SceneTypes = {
  THREE_SIXTY_SCENE: '360',
  STATIC_SCENE: 'static',
  NO_SCENE: null,
};

export default class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.previewRef = React.createRef();

    this.state = {
      isInitialized: false,
    };
  }

  componentDidMount() {
    this.initializePreview();
  }

  componentDidUpdate() {
    if (this.props.isSceneUpdated) {
      return;
    }

    if (!this.state.isInitialized) {
      this.initializePreview();
      return;
    }

    this.redrawScene();
  }

  setAsActiveScene() {
    this.props.setScenePreview(this.preview);
    this.props.sceneIsInitialized();
  }

  redrawScene() {
    this.preview.reDraw(this.props.currentScene);
    this.setAsActiveScene();
  }

  initializePreview() {
    if (this.context.params.scenes.length <= 0) {
      return;
    }

    this.preview = initializeThreeSixtyPreview(
      this.previewRef.current,
      this.context.params
    );

    this.setAsActiveScene();

    this.setState({
      isInitialized: true,
    });
  }

  render() {
    const sceneClasses = ['scene-wrapper'];
    const hasNoScenes = this.context.params.scenes.length <= 0;
    if (hasNoScenes) {
      sceneClasses.push('no-scenes');
    }

    return (
      <div className={sceneClasses.join(' ')}>
        {
          hasNoScenes &&
          <NoScene/>
        }
        <div className='scene-container' ref={this.previewRef} />
        {
          this.props.hasOverlay &&
          <div className='scene-overlay' />
        }
      </div>
    );
  }
}

Scene.contextType = H5PContext;

Scene.propTypes = {
  isSceneUpdated: PropTypes.bool,
  hasOverlay: PropTypes.bool,
  currentScene: PropTypes.number,
  sceneIsInitialized: PropTypes.func.isRequired,
  setScenePreview: PropTypes.func.isRequired,
};
