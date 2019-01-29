export const getDefaultLibraryParams = (uberName) => {
  return {
    interactionpos: '', // Filled in on saving interaction
    action: {
      library: uberName,
      params: {}
    }
  };
};