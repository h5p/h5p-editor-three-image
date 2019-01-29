import {getInteractionsField, getLibraries, getSceneField} from "../context/H5PContext";

const DefaultInteractionValues = {
  threeSixty: {
    spread: 20,
  },
  static: {
    spread: 30,
    center: [50, 50],
  }
};

export const createInteractionForm = (field, params, wrapper, parent) => {
  const hiddenFormFields = [
    'interactionpos',
  ];

  const interactionsField = getInteractionsField(field);
  const interactionFields = interactionsField.field.fields.filter(field => {
    return !hiddenFormFields.includes(field.name);
  });

  H5PEditor.processSemanticsChunk(
    interactionFields,
    params,
    wrapper,
    parent
  );

  const libraryWrapper = wrapper.querySelector('.field.library');

  const hiddenSemanticsSelectors = [
    '.h5p-editor-flex-wrapper',
    '.h5peditor-field-description',
    'select',
    '.h5peditor-copypaste-wrap',
  ];

  // Remove semantics that we don't want to show
  hiddenSemanticsSelectors.forEach(selector => {
    const foundElement = wrapper.querySelector(`.field.library > ${selector}`);

    if (foundElement) {
      libraryWrapper.removeChild(foundElement);
    }
  });
};

export const sanitizeInteractionParams = (params, interactionPosition) => {
  if (interactionPosition) {
    params.interactionpos = interactionPosition;
  }

  return params;
};

export const validateInteractionForm = (children) => {
  H5PEditor.Html.removeWysiwyg();
  return isChildrenValid(children);
};

export const getLibraryDataFromFields = async (field, library) => {
  const libraries = await getLibraries(field);
  return libraries.find(lib => {
    return lib.uberName === library;
  });
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

const isChildrenValid = (children) => {
  let isInputsValid = true;

  // validate() should always run for all children because it adds
  // styling to children that fails to validate
  children.forEach(child => {

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
    // e.g. for texts it returns the string
    const isChildValid = child.validate();
    if (isChildValid === false) {
      isInputsValid = false;
    }
  });

  return isInputsValid;
};