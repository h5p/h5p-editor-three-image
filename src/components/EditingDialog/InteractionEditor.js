import React from 'react';
import EditingDialog from "./EditingDialog";
import {H5PContext} from '../../context/H5PContext';
import './InteractionEditor.scss';
import {SceneTypes} from "../Scene/Scene";
import {getDefaultLibraryParams} from "../../h5phelpers/libraryParams";
import {getSceneFromId} from "../../h5phelpers/sceneParams";
import {
  createInteractionForm,
  getLibraryDataFromFields,
  sanitizeInteractionParams,
  validateInteractionForm
} from "../../h5phelpers/editorForms";

export const InteractionEditingType = {
  NOT_EDITING: null,
  NEW_INTERACTION: -1,
};

export default class InteractionEditor extends React.Component {
  constructor(props) {
    super(props);
    this.semanticsRef = React.createRef();

    this.state = {
      library: null,
    };
  }

  getInteractionParams(interactionIndex = null) {
    const isNewScene = interactionIndex === InteractionEditingType.NEW_INTERACTION;

    if (isNewScene) {
      return getDefaultLibraryParams(this.props.library.uberName);
    }

    const scenes = this.context.params.scenes;
    const scene = getSceneFromId(scenes, this.props.currentScene);
    return scene.interactions[interactionIndex];
  }

  getDefaultInteractionPosition() {
    const scenes = this.context.params.scenes;
    const scene = getSceneFromId(scenes, this.props.currentScene);

    if (scene.sceneType === SceneTypes.STATIC_SCENE) {
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

  async componentDidMount() {
    this.params = this.getInteractionParams(this.props.editingInteraction);
    const field = this.context.field;

    // Preserve parent's children
    this.parentChildren = this.context.parent.children;

    createInteractionForm(
      field,
      this.params,
      this.semanticsRef.current,
      this.context.parent,
    );

    // Restore parent's children after preserving our own
    this.children = this.context.parent.children;
    this.context.parent.children = this.parentChildren;

    const uberName = this.params.action.library;
    const library = await getLibraryDataFromFields(field, uberName);

    this.setState({
      library: library,
    });
  }

  handleDone() {
    const interactionIndex = this.props.editingInteraction;
    let interactionPosition = null;

    // Set default position if new interaction
    if (interactionIndex === InteractionEditingType.NEW_INTERACTION) {
      interactionPosition = this.getDefaultInteractionPosition();
    }

    this.params = sanitizeInteractionParams(this.params, interactionPosition);
    const isValid = validateInteractionForm(this.children);

    // Return to form with error messages if form is invalid
    if (!isValid) {
      return;
    }

    this.props.doneAction(this.params);
  }

  render() {
    let title = '';
    let className = '';

    if (this.state.library) {
      title = this.state.library.title;
      className = this.state.library.name
        .toLowerCase()
        .replace('.', '-');
    }

    return (
      <EditingDialog
        title={title}
        titleClasses={[className]}
        removeAction={this.props.removeAction}
        doneAction={this.handleDone.bind(this)}
      >
        <div ref={this.semanticsRef}/>
      </EditingDialog>
    );
  }
}

InteractionEditor.contextType = H5PContext;