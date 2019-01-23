import React from 'react';
import EditingDialog from "./EditingDialog";
import {getInteractionsField, H5PContext} from '../../context/H5PContext';
import './InteractionEditor.scss';

// TODO:  What scene type an interaction is placed within is not really the
//        concern of the interaction, this should be managed from a higher
//        level component, perhaps Main ?
const SceneType = {
  threeSixty: '360',
  static: 'static',
};

export const InteractionEditingType = {
  NOT_EDITING: null,
  NEW_INTERACTION: -1,
};

export default class InteractionEditor extends React.Component {
  constructor(props) {
    super(props);
    this.semanticsRef = React.createRef();
  }

  componentDidMount() {
    const interactionIndex = this.props.editingInteraction;
    const isNewScene = interactionIndex
      === InteractionEditingType.NEW_INTERACTION;

    if (isNewScene) {
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

    // TODO: Move semantics processing to the H5PContext
    const hiddenFormFields = [
      'interactionpos',
    ];

    const interactionsField = getInteractionsField(this.context.field);
    const interactionFields = interactionsField.field.fields.filter(field => {
      return !hiddenFormFields.includes(field.name);
    });

    H5PEditor.processSemanticsChunk(
      interactionFields,
      this.params,
      this.semanticsRef.current,
      this.context.parent
    );

    const libraryWrapper = this.semanticsRef.current
      .querySelector('.field.library');

    const hiddenSemanticsSelectors = [
      '.h5p-editor-flex-wrapper',
      '.h5peditor-field-description',
      'select',
      '.h5peditor-copypaste-wrap',
    ];

    // Remove semantics that we don't want to show
    hiddenSemanticsSelectors.forEach(selector => {
      const foundElement = this.semanticsRef.current
        .querySelector(`.field.library > ${selector}`);

      if (foundElement) {
        libraryWrapper.removeChild(foundElement);
      }
    });
  }

  handleDone() {
    H5PEditor.Html.removeWysiwyg();

    // TODO:  Run validation for interaction params ?

    const interactionIndex = this.props.editingInteraction;
    if (interactionIndex === InteractionEditingType.NEW_INTERACTION) {
      // Conditionally set position of the interaction
      this.params.interactionpos = this.getDefaultInteractionPosition();
    }

    this.props.doneAction(this.params);
  }

  getDefaultInteractionPosition() {
    const scene = this.context.params.scenes.find(scene => {
      return scene.sceneId === this.props.currentScene;
    });

    if (scene.sceneType === SceneType.static) {
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