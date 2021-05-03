/**
 * Initializes Three Sixty content from parameters
 *
 * @param container
 * @param params
 * @returns {*|*}
 */
export const initializeThreeSixtyPreview = (container, params, l10n) => {
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
      l10n
    }
  );
};

/**
 * Shows confirmation dialog
 *
 * @param dialogOptions
 * @param confirm
 * @param cancel
 */
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