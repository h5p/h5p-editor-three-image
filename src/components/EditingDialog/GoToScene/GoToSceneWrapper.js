import React, {Component} from 'react';
import PropTypes from 'prop-types';
import GoToScene from "./Selector/GoToScene";
import {createSceneForm, getDefaultSceneParams} from "../../../h5phelpers/forms/sceneForm";
import {H5PContext} from "../../../context/H5PContext";

export default class GoToSceneWrapper extends Component {
  constructor(props) {
    super(props);

    this.newScene = React.createRef();

    this.state = {
      markedScene: parseInt(this.props.params.action.params.nextSceneId),
      isCreatingNewScene: false,
    };
  }

  createNewScene() {
    // Process semantics for new scene
    const scenes = this.context.params.scenes;
    const params = getDefaultSceneParams(scenes);

    // Preserve parent's children
    this.parentChildren = this.context.parent.children;

    createSceneForm(
      this.context.field,
      params,
      this.newScene.current,
      this.context.parent
    );

    // Capture own children and restore parent
    this.sceneChildren = this.context.parent.children;
    this.context.parent.children = this.parentChildren;


    this.setNextSceneId(params.sceneId);

    this.props.setScene({
      children: this.sceneChildren,
      params: params,
    });

    this.setState({
      isCreatingNewScene: true,
    });
  }

  setNextSceneId(sceneId) {
    // Update number widget and params
    const nextSceneIdWidget = this.props.nextSceneIdWidget;
    nextSceneIdWidget.$input.val(sceneId);
    this.props.params.action.params.nextSceneId = sceneId;
    this.props.selectedScene();

    this.setState({
      markedScene: sceneId,
    });
  }

  render() {
    const classes = ['go-to-scene-wrapper'];
    if (this.state.isCreatingNewScene) {
      classes.push('new-scene');
    }

    return (
      <div className={classes.join(' ')}>
        {
          !this.state.isCreatingNewScene &&
          <GoToScene
            params={this.props.params}
            markedScene={this.state.markedScene}
            currentScene={this.props.currentScene}
            hasInputError={this.props.hasInputError}
            newScene={this.createNewScene.bind(this)}
            setNextSceneId={this.setNextSceneId.bind(this)}
          />
        }
        <div ref={this.newScene} />
      </div>
    );
  }
}

GoToSceneWrapper.contextType = H5PContext;

GoToSceneWrapper.propTypes = {
  params: PropTypes.object.isRequired,
  nextSceneIdWidget: PropTypes.object.isRequired,
  currentScene: PropTypes.number.isRequired,
  hasInputError: PropTypes.bool,
  selectedScene: PropTypes.func.isRequired,
  setScene: PropTypes.func.isRequired,
};
