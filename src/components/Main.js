import React from 'react';
import Scene from "./Scene/Scene";
import ControlBar from "./ControlBar/ControlBar";
import SceneEditor from "./EditingDialog/SceneEditor";
import InteractionsBar from "./InteractionsBar/InteractionsBar";
import './Main.scss';
import InteractionEditor from "./EditingDialog/InteractionEditor";
import {H5PContext} from "../context/H5PContext";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    const sceneField = H5PEditor.findSemanticsField('scenes', this.props.field);
    this.sceneFields = sceneField.field.fields;

    this.interactionsField = H5PEditor.findSemanticsField(
      'interactions',
      this.sceneFields
    );

    this.sceneRef = null;
    this.sceneWrapperRef = React.createRef();
    this.scenePreview = null;

    this.state = {
      isEditingScene: false,
      editingScene: null,
      isEditingInteraction: false,
      editingLibrary: null,
      editingInteractionIndex: null,
      currentScene: this.props.initialScene,
      isSceneInitialized: false,
    };
  }

  editScene(sceneIndex = null) {
    let editingScene = null;
    if (sceneIndex !== null) {
      editingScene = sceneIndex;
    }

    this.setState({
      isEditingScene: true,
      editingScene: editingScene,
    });
  }

  removeEditingDialog() {
    this.setState({
      isEditingScene: false,
    });
  }

  doneEditingScene(params) {
    let scenes = this.context.params.scenes;
    if (!scenes) {
      scenes = [];
    }

    const isEditing = this.state.editingScene !== null;
    if (isEditing) {
      // Replace scene
      scenes[this.state.editingScene] = params;
    }
    else {
      // Add new scene
      scenes.push(params);
    }

    // Set current scene
    this.setState((prevState) => {
      return {
        isSceneInitialized: false,
        currentScene: isEditing ? prevState.currentScene : scenes.length - 1,
        isEditingScene: false,
        editingScene: null,
      };
    });
  }

  removeInteraction() {
    // No interactions has been added yet
    if (this.state.editingInteractionIndex === null) {
      this.setState({
        isEditingInteraction: false,
        editingLibrary: null,
      });
    }

    // Delete interaction
    const deleteDialog = new H5P.ConfirmationDialog({
      headerText: 'Deleting interaction',
      dialogText: 'Are you sure you wish to delete this interaction ?',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
    }).appendTo(document.body);

    deleteDialog.on('confirmed', () => {
      const scene = this.context.params.scenes[this.state.currentScene];
      scene.interactions.splice(this.state.editingInteractionIndex, 1);

      this.setState({
        isEditingInteraction: false,
        editingInteractionIndex: null,
        editingLibrary: null,
        isSceneInitialized: false,
      });
    });

    deleteDialog.on('canceled', () => {
      this.setState({
        isEditingInteraction: false,
        editingInteractionIndex: null,
        editingLibrary: null,
      });
    });

    deleteDialog.show();
  }

  addInteraction(params) {
    const scene = this.context.params.scenes[this.state.currentScene];
    if (!scene.interactions) {
      scene.interactions = [];
    }

    if (this.state.editingInteractionIndex !== null) {
      scene.interactions[this.state.editingInteractionIndex] = params;
    }
    else {
      scene.interactions.push(params);
    }

    this.setState({
      isEditingInteraction: false,
      editingInteractionIndex: null,
      editingLibrary: null,
      isSceneInitialized: false,
    });
  }

  changeScene(sceneIndex) {
    this.setState({
      isSceneInitialized: false,
      currentScene: sceneIndex,
    });
  }

  sceneIsInitialized() {
    this.setState({
      isSceneInitialized: true,
    });
  }

  createInteraction(library) {
    this.setState({
      isEditingInteraction: true,
      editingLibrary: library,
      currentCamera: this.scenePreview.getCamera(),
    });
  }

  setSceneRef(ref) {
    this.sceneRef = ref;
  }

  setScenePreview(scene) {
    this.scenePreview = scene;

    this.scenePreview.off('doubleClickedInteraction');
    this.scenePreview.on('doubleClickedInteraction', (e) => {
      const interactionIndex = e.data;
      this.setState({
        isEditingInteraction: true,
        editingInteractionIndex: interactionIndex,
      });
    });

    this.scenePreview.off('movestop');
    this.scenePreview.on('movestop', e => {
      if (!e.data || e.data.elementIndex === undefined) {
        // Not moving an interaction
        return;
      }

      const interactionIndex = e.data.elementIndex;
      const scene = this.context.params.scenes[this.state.currentScene];
      const interaction = scene.interactions[interactionIndex];

      // Update interaction pos
      interaction.interactionpos = [
        e.data.yaw,
        e.data.pitch
      ].join(',');
    });
  }

  render() {
    return (
      <div>
        <div className='scene-editor' ref={this.sceneWrapperRef}>
          <InteractionsBar
            isSceneInitialized={this.state.isSceneInitialized}
            interactionsField={this.interactionsField}
            sceneRef={this.sceneRef}
            sceneWrapperRef={this.sceneWrapperRef}
            createInteraction={this.createInteraction.bind(this)}
          />
          <Scene
            isSceneInitialized={this.state.isSceneInitialized}
            sceneIsInitialized={this.sceneIsInitialized.bind(this)}
            setSceneRef={this.setSceneRef.bind(this)}
            setScenePreview={this.setScenePreview.bind(this)}
            forceStartScreen={this.state.currentScene}
            currentCamera={this.state.currentCamera}
          />
        </div>
        <ControlBar
          currentScene={this.state.currentScene}
          editScene={this.editScene.bind(this)}
          newScene={this.editScene.bind(this)}
          changeScene={this.changeScene.bind(this)}
        />
        {
          this.state.isEditingScene &&
          <SceneEditor
            removeAction={this.removeEditingDialog.bind(this)}
            doneAction={this.doneEditingScene.bind(this)}
            sceneFields={this.sceneFields}
            editingScene={this.state.editingScene}
          />
        }
        {
          this.state.isEditingInteraction &&
          <InteractionEditor
            removeAction={this.removeInteraction.bind(this)}
            doneAction={this.addInteraction.bind(this)}
            currentCamera={this.state.currentCamera}
            currentScene={this.state.currentScene}
            interactionsField={this.interactionsField}
            editingInteractionIndex={this.state.editingInteractionIndex}
            library={this.state.editingLibrary}
          />
        }
      </div>
    );
  }
}

Main.contextType = H5PContext;