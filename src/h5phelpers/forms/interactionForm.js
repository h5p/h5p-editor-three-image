import {getInteractionsField, isChildrenValid} from "../editorForms";

/**
 * Create interaction form and append it to wrapper
 *
 * @param field
 * @param params
 * @param wrapper
 * @param parent
 */
export const createInteractionForm = (field, params, wrapper, parent) => {
  const hiddenFormFields = [
    'interactionpos',
  ];

  const interactionsField = getInteractionsField(field);
  const interactionFields = interactionsField.field.fields.filter(field => {
    return !hiddenFormFields.includes(field.name);
  });

  H5PEditor.processSemanticsChunk(
    interactionFields,
    params,
    wrapper,
    parent
  );

  /**
   *
   * @param wrapperElem - the parent element of the elements to be removed
   * @param selectors - the list of class names to remove from wrapper
   * @param selectorString - can be used for further specifying which elements to remove
   */
  const removeElements = (wrapperElem, selectors, selectorString) => {
    selectors.forEach(selector => {
      const foundElement = wrapperElem.querySelector(`${selectorString} ${selector}`);

      if (foundElement) {
        foundElement.parentNode.removeChild(foundElement);
      }
    });
  }

  const libraryWrapper = wrapper.querySelector('.field.library');

  const hiddenSemanticsSelectors = [
    '.h5p-editor-flex-wrapper',
    '.h5peditor-field-description',
    'select',
    '.h5peditor-copypaste-wrap',
  ];

  const interactionDataWrapper = wrapper.querySelector('.field.field-name-label');
  const hiddenInteractionDataSelectors = [
    '.field-name-showAsOpenSceneContent',
  ];

  //Remove fields in that we don't want to show when library is not AdvancedText
  //TODO: Find a nicer way for this
  if(!params.action.library.includes("H5P.AdvancedText") &&
    params.action.library.includes("H5P.Image")) {
    removeElements(interactionDataWrapper, hiddenInteractionDataSelectors, '')
  }

  // Remove semantics that we don't want to show
  removeElements(libraryWrapper, hiddenSemanticsSelectors, ".field.library > ")

};

/**
 * Set interaction position parameter
 *
 * @param params
 * @param interactionPosition
 * @returns {*}
 */
export const sanitizeInteractionParams = (params, interactionPosition) => {
  if (interactionPosition) {
    params.interactionpos = interactionPosition;
  }

  return params;
};

/**
 * Checks if interaction form is valid and marks invalid fields with an error
 *
 * @param children
 * @returns {boolean} True if all children are valid
 */
export const validateInteractionForm = (children) => {
  H5PEditor.Html.removeWysiwyg();
  return isChildrenValid(children);
};
