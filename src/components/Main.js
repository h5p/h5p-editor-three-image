import React from 'react';
import Scene, {SceneTypes} from "./Scene/Scene";
import ControlBar from "./ControlBar/ControlBar";
import SceneEditor, {SceneEditingType} from "./EditingDialog/SceneEditor";
import InteractionsBar from "./InteractionsBar/InteractionsBar";
import './Main.scss';
import InteractionEditor, {InteractionEditingType} from "./EditingDialog/InteractionEditor";
import {H5PContext} from "../context/H5PContext";
import {deleteScene, getSceneFromId, setScenePositionFromCamera, updateScene} from "../h5phelpers/sceneParams";
import {updatePosition} from "../h5phelpers/libraryParams";
import {showConfirmationDialog} from "../h5phelpers/h5pComponents";

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
      isSceneSelectorExpanded: false,
    };
  }

  editScene(sceneId = SceneEditingType.NEW_SCENE) {
    this.toggleExpandSceneSelector(false);
    this.setState({
      editingScene: sceneId,
    });
  }

  updateCurrentScene(deletedSceneId) {
    const hasDeletedCurrentScene = deletedSceneId === this.state.currentScene;
    if (!hasDeletedCurrentScene) {
      return;
    }

    const scenes = this.context.params.scenes;
    if (scenes.length) {
      // Find the first scene that is not current scene and jump to it
      const newScene = scenes[0];
      this.changeScene(newScene.sceneId);
      return;
    }

    // No scenes left
    this.changeScene(SceneTypes.NO_SCENE);
  }

  updateStartScene(deletedSceneId) {
    const hasDeletedStartScene = deletedSceneId === this.state.startScene;
    if (!hasDeletedStartScene) {
      return;
    }

    let startScene = null;
    const scenes = this.context.params.scenes;
    if (scenes.length) {
      const newScene = scenes[0];
      startScene = newScene.sceneId;
    }

    // No scenes left
    this.setStartScene(startScene);
  }

  deleteScene(sceneId) {
    const isNewScene = sceneId === SceneEditingType.NEW_SCENE;
    const deleteSceneText = isNewScene
      ? 'Are you sure you wish to delete this scene ?'
      : 'Deleting this scene will also delete all interactions within the scene and any navigational hotspots pointing to this scene. Are you sure you wish to delete this scene ?';

    // Confirm deletion
    showConfirmationDialog({
      headerText: 'Deleting scene',
      dialogText: deleteSceneText,
      cancelText: 'Cancel',
      confirmText: 'Confirm',
    }, this.confirmedDeleteScene.bind(this, sceneId));
  }

  confirmedDeleteScene(sceneId) {
    this.setState({
      editingScene: SceneEditingType.NOT_EDITING,
      isSceneSelectorExpanded: false,
    });

    // Scene not added to params
    const isNewScene = sceneId === SceneEditingType.NEW_SCENE;
    if (isNewScene) {
      return;
    }

    const scenes = this.context.params.scenes;
    const scene = getSceneFromId(scenes, sceneId);
    this.context.params.scenes = deleteScene(scenes, sceneId);

    this.updateCurrentScene(scene.sceneId);
    this.updateStartScene(scene.sceneId);
    this.setState({
      isSceneUpdated: false,
    });
  }

  doneEditingScene(params, editingScene = null) {
    const scenes = this.context.params.scenes;
    editingScene = editingScene || this.state.editingScene;
    const isEditing = editingScene !== SceneEditingType.NEW_SCENE;

    // Add as start scene if this is the first scene we add
    if (!this.context.params.scenes.length) {
      this.setStartScene(params.sceneId);
    }

    this.context.params.scenes = updateScene(scenes, params, editingScene);

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
    showConfirmationDialog({
      headerText: 'Deleting interaction',
      dialogText: 'Are you sure you wish to delete this interaction ?',
      cancelText: 'Cancel',
      confirmText: 'Confirm',
    }, this.confirmRemoveInteraction.bind(this));
  }

  confirmRemoveInteraction() {
    // No interactions has been added yet
    if (this.state.editingInteraction === SceneEditingType.NEW_SCENE) {
      this.setState({
        editingInteraction: SceneEditingType.NOT_EDITING,
      });
      return;
    }

    const scenes = this.context.params.scenes;
    const scene = getSceneFromId(scenes, this.state.currentScene);
    scene.interactions.splice(this.state.editingInteraction, 1);

    this.setState({
      editingInteraction: SceneEditingType.NOT_EDITING,
      isSceneUpdated: false,
    });
  }

  editInteraction(params, sceneParams = null) {
    // Creating scene as well
    if (sceneParams) {
      this.doneEditingScene(sceneParams, SceneEditingType.NEW_SCENE);
    }

    const scenes = this.context.params.scenes;
    const scene = getSceneFromId(scenes, this.state.currentScene);
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
      isSceneSelectorExpanded: false,
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
    setScenePositionFromCamera(
      this.context.params.scenes,
      this.state.currentScene,
      this.scenePreview.getCamera().camera
    );

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
      updatePosition(
        this.context.params.scenes,
        this.state.currentScene,
        interactionIndex,
        e.data
      );
    });

    this.scenePreview.on('changedScene', e => {
      this.setState({
        currentScene: e.data,
      });
    });
  }

  toggleExpandSceneSelector(forceState) {
    // Disabled
    if (this.state.currentScene === null) {
      return;
    }

    this.setState((prevState) => {
      const isExpanded = forceState !== undefined
        ? forceState
        : !prevState.isSceneSelectorExpanded;
      return {
        isSceneSelectorExpanded: isExpanded,
      };
    });
  }

  render() {
    const hasScenes = this.context.params.scenes.length;

    return (
      <div>
        <div className='scene-editor'>
          <InteractionsBar
            isShowing={this.state.isSceneUpdated && hasScenes}
            createInteraction={this.createInteraction.bind(this)}
          />
          <Scene
            isSceneUpdated={this.state.isSceneUpdated}
            sceneIsInitialized={this.sceneIsInitialized.bind(this)}
            setScenePreview={this.setScenePreview.bind(this)}
            currentScene={this.state.currentScene}
            hasOverlay={this.state.isSceneSelectorExpanded}
          />
        </div>
        <ControlBar
          currentScene={this.state.currentScene}
          editScene={this.editScene.bind(this)}
          deleteScene={this.deleteScene.bind(this)}
          newScene={this.editScene.bind(this)}
          changeScene={this.changeScene.bind(this)}
          setStartScene={this.setStartScene.bind(this)}
          startScene={this.state.startScene}
          setStartPosition={this.setStartPosition.bind(this)}
          isSceneSelectorExpanded={this.state.isSceneSelectorExpanded}
          toggleExpandSceneSelector={this.toggleExpandSceneSelector.bind(this)}
        />
        {
          // TODO: Refactor to single editor dialog since they can never be shown together
          (this.state.editingScene !== SceneEditingType.NOT_EDITING) &&
          <SceneEditor
            removeAction={this.deleteScene.bind(this, this.state.editingScene)}
            doneAction={this.doneEditingScene.bind(this)}
            editingScene={this.state.editingScene}
          />
        }
        {
          this.state.editingInteraction !== InteractionEditingType.NOT_EDITING &&
          <InteractionEditor
            removeAction={this.removeInteraction.bind(this)}
            doneAction={this.editInteraction.bind(this)}
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