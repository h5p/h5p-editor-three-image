import React from 'react';
import EditingDialog from "./EditingDialog";
import {H5PContext} from '../../context/H5PContext';

export default class InteractionEditor extends React.Component {
  constructor(props) {
    super(props);

    this.semanticsRef = React.createRef();
    this.interactionFields = this.props.interactionsField.field.fields;
  }

  setupNewInteraction() {
    const camera = this.props.currentCamera;
    const yaw = camera.camera.yaw;
    const pitch = camera.camera.pitch;

    return {
      interactionpos: yaw + ',' + pitch,
      action: {
        library: this.props.library.uberName,
        params: {}
      },
    };
  }

  componentDidMount() {
    const interactionIndex = this.props.editingInteractionIndex;
    if (interactionIndex === null) {
      this.params = this.setupNewInteraction();
    }
    else {
      const scene = this.context.params.scenes[this.props.currentScene];
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
    this.props.doneAction(this.params);
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