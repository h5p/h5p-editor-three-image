import React from 'react';
import NoScene from "./NoScene";
import './Scene.scss';
import {H5PContext} from "../../context/H5PContext";

export default class Scene extends React.Component {
  constructor(props) {
    super(props);

    this.previewRef = React.createRef();

    // Grab library name
    this.library = Object.keys(H5PEditor.libraryLoaded)
      .filter((library) => {
        return library.split(' ')[0] === 'H5P.ThreeImage';
      })[0];
  }


  componentDidMount() {
    if (!this.props.isSceneInitialized && this.previewRef) {
      this.initializePreview();
    }
  }

  componentDidUpdate() {
    if (!this.props.isSceneInitialized && this.previewRef) {
      this.initializePreview();
    }
  }

  setAsActiveScene() {
    this.props.setScenePreview(this.preview);
    this.props.setSceneRef(this.previewRef);
    this.props.sceneIsInitialized();
  }

  initializePreview() {
    if (this.context.params.scenes.length <= 0) {
      return;
    }

    if (this.preview) {
      // TODO:  Do not re-initialize the scene, only re-render the interactions
      //        to match the new params for that scene

      this.preview.reDraw(this.props.forceStartScreen);
      this.setAsActiveScene();
      return;
    }

    while (this.previewRef.current.firstChild) {
      this.previewRef.current.removeChild(this.previewRef.current.firstChild);
    }

    const extras = {
      isEditor: true,
    };
    if (this.props.forceStartScreen) {
      extras.forceStartScreen = this.props.forceStartScreen;
    }

    // TODO:  Add a unique ID for each scene that persists across editing sessions.
    //        The scene name is not necessarily unique, so we should use an incrementing id instead.
    this.preview = H5P.newRunnable(
      {
        library: this.library,
        params: this.context.params
      },
      H5PEditor.contentId,
      H5P.jQuery(this.previewRef.current),
      undefined,
      extras
    );

    this.setAsActiveScene();
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
