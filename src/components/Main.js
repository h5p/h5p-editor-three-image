import React from 'react';
import Scene from "./Scene/Scene";
import ControlBar from "./ControlBar/ControlBar";
import NewSceneEditor from "./EditingDialog/NewSceneEditor";
import InteractionsBar from "./InteractionsBar/InteractionsBar";
import './Main.scss';

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    const sceneField = H5PEditor.findSemanticsField('scenes', this.props.field);
    this.sceneFields = sceneField.field.fields;

    this.sceneRef = null;
    this.sceneWrapperRef = React.createRef();

    this.state = {
      editing: false,
      params: this.props.params,
      currentScene: this.props.params.scenes.length ? 0 : null,
      isSceneInitialized: false,
    };
  }

  editScene() {
    this.setState({
      editing: true,
    });
  }

  removeEditingDialog() {
    this.setState({
      editing: false,
    });
  }

  finalizeEditingDialog() {
    this.setState({
      editing: false,
    });
  }

  addNewScene(params) {
    H5PEditor.Html.removeWysiwyg();
    if (!this.props.params.scenes) {
      this.props.params.scenes = [];
    }
    this.props.params.scenes.push(params);

    // Set current scene
    this.setState({
      currentScene: this.props.params.scenes.length - 1,
    });

    this.finalizeEditingDialog();
  }

  changeScene(sceneIndex) {
    this.setState({
      currentScene: sceneIndex,
    });
  }

  sceneIsInitialized() {
    this.setState({
      isSceneInitialized: true,
    });
  }

  handleAddingNewScene(params) {
    this.addNewScene(params);
    this.finalizeEditingDialog();
  }

  setSceneRef(ref) {
    this.sceneRef = ref;
  }

  render() {
    return (
      <div>
        <div className='scene-editor' ref={this.sceneWrapperRef}>
          <InteractionsBar
            isSceneInitialized={this.state.isSceneInitialized}
            sceneRef={this.sceneRef}
            sceneWrapperRef={this.sceneWrapperRef}
          />
          <Scene
            params={this.props.params}
            isSceneInitialized={this.state.isSceneInitialized}
            sceneIsInitialized={this.sceneIsInitialized.bind(this)}
            setSceneRef={this.setSceneRef.bind(this)}
            forceStartScreen={this.state.currentScene}
          />
        </div>
        <ControlBar
          currentScene={this.state.currentScene}
          params={this.props.params}
          newScene={this.editScene.bind(this)}
          changeScene={this.changeScene.bind(this)}
        />
        {
          this.state.editing &&
          <NewSceneEditor
            removeAction={this.removeEditingDialog.bind(this)}
            doneAction={this.addNewScene.bind(this)}
            sceneFields={this.sceneFields}
            params={this.props.params}
            parent={this.props.parent}
          />
        }
      </div>
    );
  }
}