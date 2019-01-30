import {SceneEditingType} from "../components/EditingDialog/SceneEditor";
import {isGoToScene} from "./libraryParams";

export const getSceneFromId = (scenes, sceneId) => {
  return scenes.find(scene => {
    return scene.sceneId === sceneId;
  });
};

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

export const setScenePositionFromCamera = (scenes, sceneId, camera) => {
  const scene = getSceneFromId(scenes, sceneId);
  scene.cameraStartPosition = [
    camera.yaw,
    camera.pitch,
  ].join(',');
};

