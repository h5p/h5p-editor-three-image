import React from 'react';
import EditingDialog from "./EditingDialog";

export default class InteractionEditor extends React.Component {
  constructor(props) {
    super(props);

    this.semanticsRef = React.createRef();
    this.libraryParams = {};

    this.interactionFields = this.props.interactionsField.field.fields;

    this.semanticsParent = {
      passReadies: false,
      ready: () => true,
    };
  }

  componentDidMount() {
    const camera = this.props.currentCamera;
    const yaw = camera.camera.yaw;
    const pitch = camera.camera.pitch;

    this.params = {
      interactionpos: yaw + ',' + pitch,
      action: {
        library: this.props.library.uberName,
        params: this.libraryParams
      },
    };

    H5PEditor.processSemanticsChunk(
      this.interactionFields,
      this.params,
      this.semanticsRef.current,
      this.semanticsParent
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