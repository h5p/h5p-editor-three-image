import React from 'react';
import Scene from "./Scene/Scene";
import ControlBar from "./ControlBar/ControlBar";
import SceneEditor, {SceneEditingType} from "./EditingDialog/SceneEditor";
import InteractionsBar from "./InteractionsBar/InteractionsBar";
import './Main.scss';
import InteractionEditor, {InteractionEditingType} from "./EditingDialog/InteractionEditor";
import {H5PContext} from "../context/H5PContext";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    this.scenePreview = null;

    this.state = {
      editingScene: SceneEditingType.NOT_EDITING,
      editingLibrary: null,
      editingInteraction: InteractionEditingType.NOT_EDITING,
      currentScene: this.props.initialScene,
      startScene: this.props.initialScene,
      isSceneUpdated: false,
    };
  }

  editScene(sceneIndex = SceneEditingType.NEW_SCENE) {
    this.setState({
      editingScene: sceneIndex,
    });
  }

  removeEditingDialog() {
    this.setState({
      editingScene: SceneEditingType.NOT_EDITING,
    });
  }

  doneEditingScene(params) {
    let scenes = this.context.params.scenes;
    if (!scenes) {
      scenes = [];
    }

    const isEditing = this.state.editingScene !== SceneEditingType.NEW_SCENE;
    if (isEditing) {
      // Replace scene
      scenes[this.state.editingScene] = params;
    }
    else {
      // Add as start scene if this is the first scene we addd
      if (!scenes.length) {
        this.context.params.startSceneId = params.sceneId;
      }

      // Add new scene
      scenes.push(params);
    }

    // Set current scene
    this.setState((prevState) => {
      return {
        isSceneUpdated: false,
        currentScene: isEditing ? prevState.currentScene : params.sceneId,
        editingScene: SceneEditingType.NOT_EDITING,
      };
    });
  }

  removeInteraction() {
    // No interactions has been added yet
    if (this.state.editingInteraction === SceneEditingType.NEW_SCENE) {
      this.setState({
        editingInteraction: SceneEditingType.NOT_EDITING,
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
      const scene = this.context.params.scenes.find(scene => {
        return scene.sceneId === this.state.currentScene;
      });
      scene.interactions.splice(this.state.editingInteraction, 1);

      this.setState({
        editingInteraction: SceneEditingType.NOT_EDITING,
        isSceneUpdated: false,
      });
    });

    deleteDialog.on('canceled', () => {
      this.setState({
        editingInteraction: SceneEditingType.NOT_EDITING,
      });
    });

    deleteDialog.show();
  }

  addInteraction(params) {
    const scene = this.context.params.scenes.find(scene => {
      return scene.sceneId === this.state.currentScene;
    });
    if (!scene.interactions) {
      scene.interactions = [];
    }

    const isEditing = this.state.editingInteraction
      !== InteractionEditingType.NEW_INTERACTION;

    if (isEditing) {
      scene.interactions[this.state.editingInteraction] = params;
    }
    else {
      scene.interactions.push(params);
    }

    this.setState({
      editingInteraction: InteractionEditingType.NOT_EDITING,
      isSceneUpdated: false,
    });
  }

  changeScene(sceneId) {
    this.setState({
      isSceneUpdated: false,
      currentScene: sceneId,
    });
  }

  setStartScene(sceneId) {
    this.context.params.startSceneId = sceneId;
    this.setState({
      startScene: sceneId,
    });
  }

  sceneIsInitialized() {
    this.setState({
      isSceneUpdated: true,
    });
  }

  createInteraction(library) {
    this.setState({
      editingInteraction: InteractionEditingType.NEW_INTERACTION,
      editingLibrary: library,
    });
  }

  setStartPosition() {
    const currentPosition = this.scenePreview.getCamera();
    const camera = currentPosition.camera;

    const cameraPos = [
      camera.yaw,
      camera.pitch,
    ].join(',');

    // TODO: Params specific operations should be done in H5PContext, e.g. getScene()
    const scene = this.context.params.scenes.find(scene => {
      return scene.sceneId === this.state.currentScene;
    });

    scene.cameraStartPosition = cameraPos;

    // TODO: Disable button when in the same position as start camera
  }

  setScenePreview(scene) {
    this.scenePreview = scene;

    this.scenePreview.off('doubleClickedInteraction');
    this.scenePreview.on('doubleClickedInteraction', (e) => {
      const interactionIndex = e.data;
      this.setState({
        editingInteraction: interactionIndex,
      });
    });

    this.scenePreview.off('movestop');
    this.scenePreview.on('movestop', e => {
      if (!e.data || e.data.elementIndex === undefined) {
        // Not moving an interaction
        return;
      }

      const interactionIndex = e.data.elementIndex;
      const scene = this.context.params.scenes.find(scene => {
        return scene.sceneId === this.state.currentScene;
      });
      const interaction = scene.interactions[interactionIndex];

      // Update interaction pos
      interaction.interactionpos = [
        e.data.yaw,
        e.data.pitch
      ].join(',');
    });

    this.scenePreview.on('changedScene', e => {
      this.setState({
        currentScene: e.data,
      });
    });
  }

  render() {
    return (
      <div>
        <div className='scene-editor'>
          <InteractionsBar
            isSceneUpdated={this.state.isSceneUpdated}
            createInteraction={this.createInteraction.bind(this)}
          />
          <Scene
            isSceneUpdated={this.state.isSceneUpdated}
            sceneIsInitialized={this.sceneIsInitialized.bind(this)}
            setScenePreview={this.setScenePreview.bind(this)}
            currentScene={this.state.currentScene}
          />
        </div>
        <ControlBar
          currentScene={this.state.currentScene}
          editScene={this.editScene.bind(this)}
          newScene={this.editScene.bind(this)}
          changeScene={this.changeScene.bind(this)}
          setStartScene={this.setStartScene.bind(this)}
          startScene={this.state.startScene}
          setStartPosition={this.setStartPosition.bind(this)}
        />
        {
          // TODO: Refactor to single editor dialog since they can never be shown together
          (this.state.editingScene !== SceneEditingType.NOT_EDITING) &&
          <SceneEditor
            removeAction={this.removeEditingDialog.bind(this)}
            doneAction={this.doneEditingScene.bind(this)}
            editingScene={this.state.editingScene}
          />
        }
        {
          this.state.editingInteraction !== InteractionEditingType.NOT_EDITING &&
          <InteractionEditor
            removeAction={this.removeInteraction.bind(this)}
            doneAction={this.addInteraction.bind(this)}
            scenePreview={this.scenePreview}
            currentScene={this.state.currentScene}
            editingInteraction={this.state.editingInteraction}
            library={this.state.editingLibrary}
          />
        }
      </div>
    );
  }
}

Main.contextType = H5PContext;