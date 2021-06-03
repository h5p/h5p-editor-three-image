// @ts-check

import {getSceneFromId} from "./sceneParams";

export const Libraries = {
  GoToScene: {
    machineName: 'H5P.GoToScene',
  },
};

/**
 * Get default params for a library
 *
 * @param {string} uberName
 * @returns {Interaction}
 */
export const getDefaultLibraryParams = (uberName) => {
  return {
    id: H5P.createUUID(),
    interactionpos: '', // Filled in on saving interaction
    action: {
      library: uberName,
      params: {}
    }
  };
};

/**
 * @param {HTMLElement} element 
 * @param {Scene[]} scenes
 * @param {number} sceneId
 * @returns {Interaction}
 */
export const getInteractionFromElement = (element, scenes, sceneId) => {
  const interactionId = element.dataset.interactionId;

  const scene = getSceneFromId(scenes, sceneId);
  return scene.interactions.find(interaction => interaction.id === interactionId);
}

/**
 * Updates position of interaction
 *
 * @param {Interaction} interaction
 * @param {CameraPosition} pos
 */
export const updatePosition = (interaction, pos) => {
  interaction.interactionpos = `${pos.yaw},${pos.pitch}`;
};

/**
 * Checks if an interaction is a GoToScene library
 *
 * @param {Interaction} interaction
 * @returns {boolean}
 */
export const isGoToScene = (interaction) => {
  const library = H5P.libraryFromString(interaction.action.library);
  return library.machineName === Libraries.GoToScene.machineName;
};
