import {getSceneField, isChildrenValid} from "../editorForms";

const DefaultInteractionValues = {
  threeSixty: {
    spread: 20,
  },
  static: {
    spread: 30,
    center: [50, 50],
  }
};

export const createSceneForm = (field, params, wrapper, parent) => {
  const sceneField = getSceneField(field);
  const hiddenSceneFields = [
    'sceneId',
    'cameraStartPosition',
    'interactions',
  ];

  const sceneFields = sceneField.field.fields.filter(sceneField => {
    return !hiddenSceneFields.includes(sceneField.name);
  });

  H5PEditor.processSemanticsChunk(
    sceneFields,
    params,
    wrapper,
    parent,
  );
};

export const validateSceneForm = (children) => {
  H5PEditor.Html.removeWysiwyg();
  return isChildrenValid(children);
};

export const sanitizeSceneForm = (params, isThreeSixty, cameraPos) => {
  if (!params.cameraStartPosition) {
    params.cameraStartPosition = '0,0';
  }

  if (!params.interactions) {
    params.interactions = [];
  }

  params.interactions.forEach(interaction => {
    sanitizeInteractionPositions(interaction, isThreeSixty, cameraPos);
  });
};

export const isInteractionsValid = (params, isThreeSixty) => {
  if (!params.interactions) {
    return true;
  }

  return params.interactions.every(interaction => {
    return isInteractionPositionValid(interaction, isThreeSixty);
  });
};

export const getDefaultSceneParams = (scenes) => {
  return {
    sceneId: getUniqueSceneId(scenes),
  };
};

const isInteractionPositionValid = (interaction, isThreeSixty) => {
  const position = interaction.interactionpos.split(',');
  return position.every(pos => {
    const hasThreeSixtyPos = pos.substr(-1) !== '%';
    return hasThreeSixtyPos === isThreeSixty;
  });
};

const sanitizeInteractionPositions = (interaction, isThreeSixty, cameraPos) => {
  if (!isInteractionPositionValid(interaction, isThreeSixty)) {
    interaction.interactionpos = getNewInteractionPos(isThreeSixty, cameraPos);
  }
};

const getNewInteractionPos = (isThreeSixtyScene, cameraPos) => {
  // Place interactions spread randomly within a threshold in degrees
  let center = DefaultInteractionValues.static.center;
  let spread = DefaultInteractionValues.static.spread;

  if (isThreeSixtyScene) {
    center = cameraPos.split(',').map(parseFloat);
    spread = DefaultInteractionValues.threeSixty.spread * Math.PI / 180;
  }

  return center.map(pos => spreadByValue(pos, spread))
    .map(pos => isThreeSixtyScene ? pos : pos + '%')
    .join(',');
};

const spreadByValue = (center, spread) => {
  return center - (spread / 2) + (Math.random() * spread);
};

const getUniqueSceneId = (scenes) => {
  if (!scenes.length) {
    return 0;
  }

  const sceneIds = scenes.map(scene => scene.sceneId);
  const maxSceneId = Math.max(...sceneIds);
  return maxSceneId + 1;
};