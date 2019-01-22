import React from 'react';
import EditingDialog from "./EditingDialog";
import {getSceneField, H5PContext} from "../../context/H5PContext";

export const SceneEditingType = {
  NOT_EDITING: null,
  NEW_SCENE: -1,
};

export default class SceneEditor extends React.Component {
  constructor(props) {
    super(props);

    this.semanticsRef = React.createRef();
    this.semanticsParent = {
      passReadies: false,
      ready: () => true,
    };
  }

  componentDidMount() {
    let params = {};
    const scenes = this.context.params.scenes;
    if (this.props.editingScene !== SceneEditingType.NEW_SCENE) {
      params = scenes[this.props.editingScene];
    }
    else {
      // Set unique ID for the new scene
      let sceneId = 0;
      if (scenes.length) {
        const sceneIds = scenes.map(scene => {
          return scene.sceneId;
        });
        const maxSceneId = Math.max(...sceneIds);
        sceneId = maxSceneId + 1;
      }
      params.sceneId = sceneId;
    }
    this.params = params;

    // TODO: Move semantics processing to the H5PContext
    H5PEditor.processSemanticsChunk(
      getSceneField(this.context.field),
      this.params,
      this.semanticsRef.current,
      this.semanticsParent
    );

    // Preserve the children
    this.children = this.semanticsParent.children;
  }

  handleDone() {

    // TODO:  If SceneType has changed we must display a confirmation dialog
    //        and reset all interaction positions to the center/close to the
    //        center on confirmation.

    // Validate children
    H5PEditor.Html.removeWysiwyg();

    let isInputsValid = true;
    // validate() should always run for all children because it adds
    // styling to children that fails to validate
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
      if (isChildValid === false) {
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

SceneEditor.contextType = H5PContext;