import {getSceneFromId} from "./sceneParams";

export const getDefaultLibraryParams = (uberName) => {
  return {
    interactionpos: '', // Filled in on saving interaction
    action: {
      library: uberName,
      params: {}
    }
  };
};

export const updatePosition = (scenes, sceneId, interactionIndex, pos) => {
  const scene = getSceneFromId(scenes, sceneId);
  const interaction = scene.interactions[interactionIndex];

  // Update interaction pos
  interaction.interactionpos = [
    pos.yaw,
    pos.pitch
  ].join(',');
};