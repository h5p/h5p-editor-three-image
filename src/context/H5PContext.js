import React from 'react';

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

export const getLibraries = async (field) => {
  const actionField = H5PEditor.findSemanticsField(
    'action',
    getInteractionsField(field)
  );

  return new Promise(resolve => {
    H5PEditor.LibraryListCache.getLibraries(
      actionField.options,
      (libraries) => {
        resolve(libraries);
      }
    );
  });
};

export const initializeThreeSixtyPreview = (container, params) => {
  const library = Object.keys(H5PEditor.libraryLoaded)
    .filter((library) => {
      return library.split(' ')[0] === 'H5P.ThreeImage';
    })[0];

  return H5P.newRunnable(
    {
      library: library,
      params: params
    },
    H5PEditor.contentId,
    H5P.jQuery(container),
    undefined,
    {
      isEditor: true,
    }
  );
};

export const getImageSource = (path) => {
  return H5P.getPath(path, H5PEditor.contentId);
};

export const showConfirmationDialog = (dialogOptions, confirm, cancel) => {
  const deleteDialog = new H5P.ConfirmationDialog(dialogOptions)
    .appendTo(document.body);

  deleteDialog.on('confirmed', () => {
    if (confirm) {
      confirm();
    }
  });

  deleteDialog.on('canceled', () => {
    if (cancel) {
      cancel();
    }
  });

  deleteDialog.show();
};

export const H5PContext = React.createContext(null);