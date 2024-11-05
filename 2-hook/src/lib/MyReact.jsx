import React from "react";

const MyReact = (function MyReact() {
  const memorizedStates = [];
  const isInitialized = [];

  const useState = (cursor, initValue) => {
    const { forceUpdate } = useForceUpdate();

    if (!isInitialized[cursor]) {
      isInitialized[cursor] = true;
      memorizedStates[cursor] = initValue;
    }

    const state = memorizedStates[cursor];

    const setState = (nextState) => {
      if (state === nextState) return;

      memorizedStates[cursor] = nextState;
      forceUpdate();
    };

    return [state, setState];
  };

  const useForceUpdate = () => {
    const [value, setValue] = React.useState(1);

    const forceUpdate = () => setValue(value + 1);

    return { forceUpdate };
  };

  return { useState };
})();

export default MyReact;
