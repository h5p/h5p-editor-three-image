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

/**
 * Creates scene form and appends it to wrapper
 *
 * @param field
 * @param params
 * @param wrapper
 * @param parent
 */
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

/**
 * Checks if scene form is valid and marks invalid fields
 *
 * @param children
 * @returns {boolean} True if valid
 */
export const validateSceneForm = (children) => {
  H5PEditor.Html.removeWysiwyg();
  return isChildrenValid(children);
};

/**
 * Sets default values for scene parameters that are not initially set by
 * the user when creating a scene.
 *
 * @param params
 * @param isThreeSixty
 * @param cameraPos
 */
export const sanitizeSceneForm = (params, isThreeSixty, cameraPos) => {
  if (!params.cameraStartPosition) {
    params.cameraStartPosition = [
      -(Math.PI * (2/3)),
      0
    ].join(',');
  }

  if (!params.interactions) {
    params.interactions = [];
  }

  params.interactions.forEach(interaction => {
    sanitizeInteractionPositions(interaction, isThreeSixty, cameraPos);
  });
};

/**
 * Check if all interactions has valid positions
 *
 * @param params
 * @param isThreeSixty
 * @returns {boolean}
 */
export const isInteractionsValid = (params, isThreeSixty) => {
  if (!params.interactions) {
    return true;
  }

  return params.interactions.every(interaction => {
    return isInteractionPositionValid(interaction, isThreeSixty);
  });
};

/**
 * Get initial parameters for an empty scene
 *
 * @param scenes
 * @returns {{sceneId: (number|*)}}
 */
export const getDefaultSceneParams = (scenes) => {
  return {
    sceneId: getUniqueSceneId(scenes),
  };
};

/**
 * Checks if a single interaction has a valid position given scene type
 *
 * @param interaction
 * @param isThreeSixty
 * @returns {boolean}
 */
const isInteractionPositionValid = (interaction, isThreeSixty) => {
  const position = interaction.interactionpos.split(',');
  return position.every(pos => {
    const hasThreeSixtyPos = pos.substr(-1) !== '%';
    return hasThreeSixtyPos === isThreeSixty;
  });
};

/**
 * Sets a default position for an interaction if it has an invalid position for
 * the given scene type
 *
 * @param interaction
 * @param isThreeSixty
 * @param cameraPos
 */
const sanitizeInteractionPositions = (interaction, isThreeSixty, cameraPos) => {
  if (!isInteractionPositionValid(interaction, isThreeSixty)) {
    interaction.interactionpos = getNewInteractionPos(isThreeSixty, cameraPos);
  }
};

/**
 * Gets a default interaction position given a scene type
 *
 * @param isThreeSixtyScene
 * @param cameraPos
 * @returns {string}
 */
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

/**
 * Gets a random position within a percentage spread around the center
 * position
 *
 * @param center
 * @param spread
 * @returns {number}
 */
const spreadByValue = (center, spread) => {
  return center - (spread / 2) + (Math.random() * spread);
};

/**
 * Grabs a unique ID that is higher than the highest ID in our scenes collection
 *
 * @param scenes
 * @returns {number}
 */
const getUniqueSceneId = (scenes) => {
  if (!scenes.length) {
    return 0;
  }

  const sceneIds = scenes.map(scene => scene.sceneId);
  const maxSceneId = Math.max(...sceneIds);
  return maxSceneId + 1;
};
