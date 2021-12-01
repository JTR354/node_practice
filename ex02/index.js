module.exports.compose = (middleWares) => () => {
  dispatch(0);
  function dispatch(i) {
    const fn = middleWares[i];
    if (fn) {
      return Promise.resolve(
        fn(() => {
          dispatch(i + 1);
        })
      );
    }
    return Promise.resolve("");
  }
};
