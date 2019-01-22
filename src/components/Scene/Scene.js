import React from 'react';
import NoScene from "./NoScene";
import './Scene.scss';
import {H5PContext, initializeThreeSixtyPreview} from "../../context/H5PContext";

export default class Scene extends React.Component {
  constructor(props) {
    super(props);
    this.previewRef = React.createRef();

    this.state = {
      isInitialize: false,
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
    this.preview.reDraw();
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
    if (this.context.params.scenes.length <= 0) {
      return <NoScene/>;
    }

    return (
      <div className='scene-container' ref={this.previewRef} />
    );
  }
}

Scene.contextType = H5PContext;
