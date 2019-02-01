import {shape, oneOf, string, func, oneOfType, number} from 'prop-types';
import {SceneTypes} from "../components/Scene/Scene";
import {InteractionEditingType} from "../components/EditingDialog/InteractionEditor";

export const sceneType = shape({
  sceneType: oneOf(Object.values(SceneTypes)).isRequired,
  scenename: string.isRequired,
  scenesrc: shape({
    path: string.isRequired,
    alt: string
  }).isRequired
});

export const libraryType = shape({
  uberName: string.isRequired,
});

export const scenePreviewType = shape({
  getCamera: func.isRequired,
});

export const editingSceneType = oneOfType([
  number,
  oneOf(Object.values(InteractionEditingType)),
]);