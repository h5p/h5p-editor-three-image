import React from 'react';
import EditingDialog from "./EditingDialog";
import {H5PContext} from "../../context/H5PContext";

export default class NewSceneEditor extends React.Component {
  constructor(props) {
    super(props);

    this.semanticsRef = React.createRef();
    this.params = {};
  }

  componentDidMount() {
    H5PEditor.processSemanticsChunk(
      this.props.sceneFields,
      this.params,
      this.semanticsRef.current,
      this.context.parent
    );

    // Preserve the children
    this.children = this.context.parent.children;
  }

  handleDone() {
    // Validate children
    H5PEditor.Html.removeWysiwyg();

    let isInputsValid = true;
    this.children.forEach(child => {
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

NewSceneEditor.contextType = H5PContext;