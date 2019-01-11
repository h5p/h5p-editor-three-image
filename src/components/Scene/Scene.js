import React from 'react';
import NoScene from "./NoScene";
import './Scene.scss';

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
    if (this.previewRef) {
      this.initializePreview();
    }
  }

  componentDidUpdate() {
    if (this.previewRef) {
      this.initializePreview();
    }
  }

  initializePreview() {
    if (this.props.params.scenes.length <= 0) {
      return;
    }

    while (this.previewRef.current.firstChild) {
      this.previewRef.current.removeChild(this.previewRef.current.firstChild);
    }

    const extras = {};
    if (this.props.forceStartScreen) {
      extras.forceStartScreen = this.props.forceStartScreen;
    }

    this.preview = H5P.newRunnable(
      {
        library: this.library,
        params: this.props.params
      },
      H5PEditor.contentId,
      H5P.jQuery(this.previewRef.current),
      undefined,
      extras
    );
  }

  render() {
    console.log("what is scenes ?", this.props.params.scenes);
    if (this.props.params.scenes.length <= 0) {
      return <NoScene/>;
    }

    return (
      <div className='scene-container' ref={this.previewRef} />
    );
  }
}