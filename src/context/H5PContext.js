import React from 'react';
import {getInteractionsField} from "../h5phelpers/editorForms";

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

export const getImageSource = (path) => {
  return H5P.getPath(path, H5PEditor.contentId);
};

export const H5PContext = React.createContext(null);