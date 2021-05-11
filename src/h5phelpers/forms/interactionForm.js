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

  const libraryWrapper = wrapper.querySelector('.field.library');

  const hiddenSemanticsSelectors = [
    '.h5p-editor-flex-wrapper',
    '.h5peditor-field-description',
    'select',
    '.h5peditor-copypaste-wrap',
  ];

  //TODO: Find a nicer way for this
  const interactionDataWrapper = wrapper.querySelector('.field.field-name-label');
  const hiddenInteractionDataSelectors = [
    '.field-name-showAsOpenSceneContent',
  ];
  if(!params.action.library.includes("H5P.AdvancedText") && !params.action.library.includes("H5P.Image")) {
    // Remove semantics that we don't want to show
    hiddenInteractionDataSelectors.forEach(selector => {
      const foundElement = wrapper.querySelector(`.field.field-name-label ${selector}`);
      console.log(foundElement.parentNode)
      if (foundElement) {
        foundElement.parentNode.removeChild(foundElement);
      }
    });
  }

  // Remove semantics that we don't want to show
    hiddenSemanticsSelectors.forEach(selector => {
      const foundElement = wrapper.querySelector(`.field.library > ${selector}`);
      console.log(foundElement)
      if (foundElement) {
        libraryWrapper.removeChild(foundElement);
      }
    });



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
