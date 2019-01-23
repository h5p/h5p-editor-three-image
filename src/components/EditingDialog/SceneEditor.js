import React from 'react';
import EditingDialog from "./EditingDialog";
import {getSceneField, H5PContext} from "../../context/H5PContext";
import {SceneTypes} from "../Scene/Scene";

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
      ready: (callBack) => {
        if (callBack) {
          callBack();
        }
        return true;
      },
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
    const sceneField = getSceneField(this.context.field);
    const hiddenSceneFields = [
      'sceneId',
      'cameraStartPosition',
      'interactions',
    ];

    this.sceneFields = sceneField.field.fields.filter(sceneField => {
      return !hiddenSceneFields.includes(sceneField.name);
    });

    H5PEditor.processSemanticsChunk(
      this.sceneFields,
      this.params,
      this.semanticsRef.current,
      this.semanticsParent
    );

    // Preserve the children
    this.children = this.semanticsParent.children;
  }

  sanitizeInteractionPositions() {
    // Update interactions if scene type is changed
    const isThreeSixtyScene = this.params.sceneType
      === SceneTypes.THREE_SIXTY_SCENE;

    const hasPercentageDenotation = (position) => {
      return position.substr(-1) === '%';
    };

    this.params.interactions.forEach(interaction => {
      const position = interaction.interactionpos.split(',');

      const isValidPosition = position.reduce((isValid, pos) => {
        const isStaticScenePositions = hasPercentageDenotation(pos);
        const hasCorrectDenotation = isThreeSixtyScene
          ? !isStaticScenePositions
          : isStaticScenePositions;

        return isValid && hasCorrectDenotation;
      }, true);

      if (!isValidPosition) {
        // Spread interactions a bit so they don't overlap so much
        let newPos;
        if (isThreeSixtyScene) {
          // Place interactions spread randomly within a threshold in degrees
          const cameraCenter = this.params.cameraStartPosition
            .split(',')
            .map(parseFloat);

          const degreeSpread = 20;
          const radianSpread = degreeSpread * Math.PI / 180;
          const yawCenterOffset = cameraCenter[0] - radianSpread / 2;
          const pitchCenterOffset = cameraCenter[1] - radianSpread / 2;
          const newYaw = yawCenterOffset + Math.random() * radianSpread;
          const newPitch = pitchCenterOffset + Math.random() * radianSpread;
          newPos = [
            newYaw,
            newPitch
          ].join(',');
        }
        else {
          // Spread interactions within percentage position of center
          const percentageSpread = 30;
          const centerOffset = 50 - percentageSpread / 2;
          const newX = centerOffset + Math.random() * percentageSpread;
          const newY = centerOffset + Math.random() * percentageSpread;
          newPos = [
            newX + '%',
            newY + '%',
          ].join(',');
        }
        interaction.interactionpos = newPos;
      }
    });

  }

  handleDone() {

    // TODO:  If SceneType has changed we must display a confirmation dialog
    //        and reset all interaction positions to the center/close to the
    //        center on confirmation.

    // Fill in initial camera position if it is not set
    if (!this.params.cameraStartPosition) {
      this.params.cameraStartPosition = '0,0';
    }

    this.sanitizeInteractionPositions();

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
        title='Scene'
        titleClasses={['scene']}
        removeAction={this.props.removeAction}
        doneAction={this.handleDone.bind(this)}
      >
        <div ref={this.semanticsRef}/>
      </EditingDialog>
    );
  }
}

SceneEditor.contextType = H5PContext;