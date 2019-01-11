import React from 'react';
import Scene from "./Scene/Scene";
import ControlBar from "./ControlBar/ControlBar";
import NewSceneEditor from "./EditingDialog/NewSceneEditor";

export default class Main extends React.Component {
  constructor(props) {
    super(props);

    const sceneField = H5PEditor.findSemanticsField('scenes', this.props.field);
    this.sceneFields = sceneField.field.fields;

    this.state = {
      editing: false,
      params: this.props.params,
      currentScene: null,
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
    console.log("what is params now ?", this.props.params);

    // Set current scene
    this.setState({
      currentScene: this.props.params.scenes.length - 1,
    });

    this.finalizeEditingDialog();
  }

  handleAddingNewScene(params) {
    this.addNewScene(params);
    this.finalizeEditingDialog();
  }

  render() {
    return (
      <div>
        <Scene
          params={this.props.params}
          forceStartScreen={this.state.currentScene}
        />
        <ControlBar
          newScene={this.editScene.bind(this)}
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