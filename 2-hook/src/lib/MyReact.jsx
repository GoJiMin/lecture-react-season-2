import React, { useReducer } from "react";
import { createEventEmitter } from "shared/lib/EventEmitter";

const MyReact = (function MyReact() {
  const memorizedStates = [];
  const deps = [];
  const isInitialized = [];
  const cleanUps = [];
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

  const useEffect = (effect, nextDeps) => {
    function runDedeferedEffect() {
      function runEffect() {
        const cleanUp = effect();
        if (cleanUp) cleanUps[cursor] = cleanUp;
      }

      const ENOUGH_TO_RUN_RENDER = 1;
      setTimeout(runEffect, ENOUGH_TO_RUN_RENDER);
    }

    if (!isInitialized[cursor]) {
      isInitialized[cursor] = true;
      deps[cursor] = nextDeps;
      cursor++;

      runDedeferedEffect();
      return;
    }

    const prevDeps = deps[cursor];

    const depsSame = prevDeps.every(
      (prevDep, index) => prevDep === nextDeps[index]
    );

    if (depsSame) {
      cursor++;
      return;
    }

    deps[cursor] = nextDeps;
    cursor++;
    runDedeferedEffect();
  };

  function resetCursor() {
    cursor = 0;
  }

  function cleanUpEffects() {
    cleanUps.forEach((cleanUp) => typeof cleanUp === "function" && cleanUp());

    isInitialized.length = 0;
    deps.length = 0;
    cleanUps.length = 0;
    memorizedStates.length = 0;
  }

  function createContext(initialValue) {
    const emitter = createEventEmitter(initialValue);

    function Provider({ children, value }) {
      React.useEffect(() => {
        emitter.set(value);
      }, [value]);

      return <>{children}</>;
    }

    return {
      Provider,
      emitter,
    };
  }

  function useContext(context) {
    const [value, setValue] = React.useState(context.emitter.get());

    React.useEffect(() => {
      context.emitter.on(setValue);

      return () => context.emitter.off(setValue);
    }, [context]);

    return value;
  }

  function useRef(initialValue) {
    if (!isInitialized[cursor]) {
      memorizedStates[cursor] = { current: initialValue };
      isInitialized[cursor] = true;
    }

    const memorizedState = memorizedStates[cursor];
    cursor = cursor + 1;

    return memorizedState;
  }

  function createStore(reducer, initialValue) {
    let currentState = initialValue;
    const listeners = [];

    const getState = () => currentState;
    const subscribe = (callback) => listeners.push(callback);

    const dispatch = (action) => {
      const nextState = reducer(currentState, action);

      if (nextState !== currentState) {
        currentState = nextState;

        listeners.forEach((listener) => listener());
      }
    };

    return {
      getState,
      subscribe,
      dispatch,
    };
  }

  function useReducer(reducer, initialValue) {
    const { forceUpdate } = useForceUpdate();
    if (!isInitialized[cursor]) {
      memorizedStates[cursor] = createStore(reducer, initialValue);
      isInitialized[cursor] = true;
    }

    const store = memorizedStates[cursor];
    store.subscribe(forceUpdate);

    cursor = cursor + 1;

    return [store.getState(), store.dispatch];
  }

  return {
    useState,
    useEffect,
    useContext,
    useRef,
    useReducer,
    createContext,
    createStore,
    resetCursor,
    cleanUpEffects,
  };
})();

export default MyReact;
