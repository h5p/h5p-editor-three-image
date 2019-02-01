import React from 'react';
import {getInteractionsField} from "../h5phelpers/editorForms";

/**
 * Get loaded libraries that are available of the ones defined by action
 * in semantics
 *
 * @param {Object} field The field for Three Image
 * @returns {Promise} Returns with libraries
 */
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

/**
 * Get absolute path to image from relative parameters path
 *
 * @param {string} path Relative path as found in content parameters
 * @returns {string} Absolute path to image
 */
export const getImageSource = (path) => {
  return H5P.getPath(path, H5PEditor.contentId);
};

export const H5PContext = React.createContext(null);