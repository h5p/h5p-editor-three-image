import React from 'react';
import EditingDialog from "./EditingDialog";

export default class NewSceneEditor extends React.Component {
  constructor(props) {
    super(props);

    this.semanticsRef = React.createRef();
    this.newSceneParams = {};
    this.semanticsParent = {
      passReadies: false,
      ready: () => true,
    };
  }

  componentDidMount() {

    H5PEditor.processSemanticsChunk(
      this.props.sceneFields,
      this.newSceneParams,
      this.semanticsRef.current,
      this.semanticsParent
    );

    console.log("what is semantics parent after processing semantics ?", this.semanticsParent);
  }

  handleDone() {
    // Validate children
    console.log("running validation");
    let isInputsValid = true;
    this.semanticsParent.children.forEach(child => {
      // Special validation for scene image, since having a required image
      // is not supported by core yet
      const isRequiredImage = child.field.type === 'image'
        && (child.field.optional === undefined
          || child.field.optional === false);
      if (isRequiredImage) {
        if (!child.params || !child.params.path) {
          isInputsValid = false;
        }
      }

      // Note that validate() does not necessarily return a bool...
      // e.g. for texts
      const isChildValid = child.validate();
      if (!isChildValid) {
        isInputsValid = false;
      }
    });

    // Inputs must be valid to create a scene
    if (!isInputsValid) {
      return;
    }

    this.props.doneAction(this.newSceneParams);
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