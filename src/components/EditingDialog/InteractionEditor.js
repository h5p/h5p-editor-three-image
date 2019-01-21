import React from 'react';
import EditingDialog from "./EditingDialog";
import {H5PContext} from '../../context/H5PContext';

const sceneType = {
  threeSixty: '360',
  static: 'static',
};

export default class InteractionEditor extends React.Component {
  constructor(props) {
    super(props);

    this.semanticsRef = React.createRef();
    this.interactionFields = this.props.interactionsField.field.fields;
  }

  componentDidMount() {
    const interactionIndex = this.props.editingInteractionIndex;
    if (interactionIndex === null) {
      this.params = {
        interactionpos: '', // Filled in on saving interaction
        action: {
          library: this.props.library.uberName,
          params: {}
        }
      };

    }
    else {
      const scene = this.context.params.scenes.find(scene => {
        return scene.sceneId === this.props.currentScene;
      });
      this.params = scene.interactions[interactionIndex];
    }

    H5PEditor.processSemanticsChunk(
      this.interactionFields,
      this.params,
      this.semanticsRef.current,
      this.context.parent
    );

    const libraryWrapper = this.semanticsRef.current
      .querySelector('.field.library');

    // Remove selector and copy/paste
    const librarySelector = libraryWrapper.querySelector('select');
    const copyPasteWrapper = libraryWrapper
      .querySelector('.h5peditor-copypaste-wrap');

    libraryWrapper.removeChild(librarySelector);
    libraryWrapper.removeChild(copyPasteWrapper);
  }

  handleDone() {
    H5PEditor.Html.removeWysiwyg();

    // TODO:  Run validation for interaction params ?

    const interactionIndex = this.props.editingInteractionIndex;
    if (interactionIndex === null) {
      // Conditionally set position of the interaction
      this.params.interactionpos = this.getDefaultInteractionPosition();
    }

    this.props.doneAction(this.params);
  }

  getDefaultInteractionPosition() {
    const scene = this.context.params.scenes.find(scene => {
      return scene.sceneId === this.props.currentScene;
    });

    if (scene.sceneType === sceneType.static) {
      // Place it in image center
      // % denotes that its placed on a static image.
      return '50%,50%';
    }

    const camera = this.props.scenePreview.getCamera();
    const yaw = camera.camera.yaw;
    const pitch = camera.camera.pitch;

    return [
      yaw,
      pitch
    ].join(',');
  }

  render() {
    return (
      <EditingDialog
        removeAction={this.props.removeAction}
        doneAction={this.handleDone.bind(this)}
      >
        <div ref={this.semanticsRef}/>
      </EditingDialog>
    );
  }
}

InteractionEditor.contextType = H5PContext;