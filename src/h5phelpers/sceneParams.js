import {SceneEditingType} from "../components/EditingDialog/SceneEditor";
import {isGoToScene} from "./libraryParams";

/**
 * Get scene from id
 *
 * @param scenes
 * @param sceneId
 * @returns {*}
 */
export const getSceneFromId = (scenes, sceneId) => {
  return scenes.find(scene => {
    return scene.sceneId === sceneId;
  });
};

/**
 * Delete a scene in parameters and deletes any GoToScene interactions
 * within other scenes that was pointing to the deleted scene
 *
 * @param scenes
 * @param sceneId
 * @returns {*}
 */
export const deleteScene = (scenes, sceneId) => {
  // Filter out the scene
  const sceneRemoved  = scenes.filter(scene => {
    return scene.sceneId !== sceneId;
  });

  // Filter out any interactions pointing to the scene
  return sceneRemoved.map(scene => {
    const interactions = scene.interactions;
    if (interactions) {
      scene.interactions = interactions.filter(interaction => {
        if (!isGoToScene(interaction)) {
          return true;
        }

        // Filter away GoToScene with the deleted scene id
        return interaction.action.params.nextSceneId !== sceneId;
      });
    }

    return scene;
  });
};

/**
 * Updates a scene within parameters
 *
 * @param scenes
 * @param params
 * @param editingScene
 * @returns {*}
 */
export const updateScene = (scenes, params, editingScene = -1) => {
  if (editingScene === SceneEditingType.NEW_SCENE) {
    scenes.push(params);
    return scenes;
  }

  return scenes.map(scene => {
    if (scene.sceneId === editingScene) {
      // Replace scene
      scene = params;
    }
    return scene;
  });
};

/**
 * Set scene position in parameters
 *
 * @param scenes
 * @param sceneId
 * @param camera
 */
export const setScenePositionFromCamera = (scenes, sceneId, camera) => {
  const scene = getSceneFromId(scenes, sceneId);
  scene.cameraStartPosition = [
    camera.yaw,
    camera.pitch,
  ].join(',');
};

