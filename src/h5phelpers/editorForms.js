import {getLibraries} from "../context/H5PContext";

export const getSceneField = (field) => {
  return H5PEditor.findSemanticsField(
    'scenes',
    field
  );
};
export const getInteractionsField = (field) => {
  const sceneFields = getSceneField(field);

  return H5PEditor.findSemanticsField(
    'interactions',
    sceneFields
  );
};

export const getLibraryDataFromFields = async (field, library) => {
  const libraries = await getLibraries(field);
  return libraries.find(lib => {
    return lib.uberName === library;
  });
};

export const isChildrenValid = (children) => {
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