import React from "react";

const MyReact = (function MyReact() {
  const memorizedStates = [];
  const isInitialized = [];
  let cursor = 0;

  const useState = (initValue) => {
    const { forceUpdate } = useForceUpdate();

    if (!isInitialized[cursor]) {
      isInitialized[cursor] = true;
      memorizedStates[cursor] = initValue;
    }

    const state = memorizedStates[cursor];

    const setStateAt = (_cursor) => (nextState) => {
      if (state === nextState) return;

      memorizedStates[_cursor] = nextState;
      forceUpdate();
    };

    const setState = setStateAt(cursor);

    cursor++;

    return [state, setState];
  };

  const useForceUpdate = () => {
    const [value, setValue] = React.useState(1);

    const forceUpdate = () => {
      setValue(value + 1);
      cursor = 0;
    };

    return { forceUpdate };
  };

  const useEffect = (effect) => {
    function runDedeferedEffect() {
      const ENOUGH_TO_RUN_RENDER = 1;
      setTimeout(effect, ENOUGH_TO_RUN_RENDER);
    }

    runDedeferedEffect();
  };

  return { useState, useEffect };
})();

export default MyReact;
