export const getSceneFromId = (scenes, sceneId) => {
  return scenes.find(scene => {
    return scene.sceneId === sceneId;
  });
};