import React from 'react';
import Scene from "./Scene/Scene";
import ControlBar from "./ControlBar/ControlBar";
import NewSceneEditor from "./EditingDialog/NewSceneEditor";
import InteractionsBar from "./InteractionsBar/InteractionsBar";
import './Main.scss';
import InteractionEditor from "./EditingDialog/InteractionEditor";

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
      isEditingNewScene: false,
      isEditingInteraction: false,
      editingLibrary: null,
      editingInteractionIndex: null,
      currentScene: this.props.params.scenes.length ? 0 : null,
      isSceneInitialized: false,
    };
  }

  editScene() {
    this.setState({
      isEditingNewScene: true,
    });
  }

  removeEditingDialog() {
    this.setState({
      isEditingNewScene: false,
    });
  }

  finalizeEditingDialog() {
    this.setState({
      isEditingNewScene: false,
    });
  }

  addNewScene(params) {
    if (!this.props.params.scenes) {
      this.props.params.scenes = [];
    }
    this.props.params.scenes.push(params);

    // Set current scene
    this.setState({
      isSceneInitialized: false,
      currentScene: this.props.params.scenes.length - 1,
    });

    this.finalizeEditingDialog();
  }

  removeInteractionDialog() {
    this.setState({
      isEditingInteraction: false,
      editingLibrary: null,
    });
  }

  addInteraction(params) {
    const scene = this.props.params.scenes[this.state.currentScene];
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

  handleAddingNewScene(params) {
    this.addNewScene(params);
    this.finalizeEditingDialog();
  }

  setSceneRef(ref) {
    this.sceneRef = ref;
  }

  setScenePreview(scene) {
    this.scenePreview = scene;

    this.scenePreview.on('doubleClickedInteraction', (e) => {
      const interactionIndex = e.data;
      this.setState({
        isEditingInteraction: true,
        editingInteractionIndex: interactionIndex,
      });
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
            params={this.props.params}
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
          params={this.props.params}
          newScene={this.editScene.bind(this)}
          changeScene={this.changeScene.bind(this)}
        />
        {
          this.state.isEditingNewScene &&
          <NewSceneEditor
            removeAction={this.removeEditingDialog.bind(this)}
            doneAction={this.addNewScene.bind(this)}
            sceneFields={this.sceneFields}
            params={this.props.params}
            parent={this.props.parent}
          />
        }
        {
          this.state.isEditingInteraction &&
          <InteractionEditor
            removeAction={this.removeInteractionDialog.bind(this)}
            doneAction={this.addInteraction.bind(this)}
            currentCamera={this.state.currentCamera}
            currentScene={this.state.currentScene}
            interactionsField={this.interactionsField}
            editingInteractionIndex={this.state.editingInteractionIndex}
            library={this.state.editingLibrary}
            params={this.props.params}
            parent={this.props.parent}
          />
        }
      </div>
    );
  }
}