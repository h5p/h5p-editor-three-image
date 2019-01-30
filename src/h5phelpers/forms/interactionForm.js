import {getInteractionsField, isChildrenValid} from "../editorForms";

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

  // Remove semantics that we don't want to show
  hiddenSemanticsSelectors.forEach(selector => {
    const foundElement = wrapper.querySelector(`.field.library > ${selector}`);

    if (foundElement) {
      libraryWrapper.removeChild(foundElement);
    }
  });
};

export const sanitizeInteractionParams = (params, interactionPosition) => {
  if (interactionPosition) {
    params.interactionpos = interactionPosition;
  }

  return params;
};
export const validateInteractionForm = (children) => {
  H5PEditor.Html.removeWysiwyg();
  return isChildrenValid(children);
};