import React from "react";

const MyReact = (function MyReact() {
  let isInitialized = false;
  let firstName;

  const useName = (initValue) => {
    const { forceUpdate } = useForceUpdate();

    if (!isInitialized) {
      isInitialized = true;
      firstName = initValue;
    }

    const setFirstName = (value) => {
      if (firstName === value) return;

      firstName = value;
      forceUpdate();
    };

    return [firstName, setFirstName];
  };

  const useForceUpdate = () => {
    const [value, setValue] = React.useState(1);

    const forceUpdate = () => setValue(value + 1);

    return { forceUpdate };
  };

  return { useName };
})();

export default MyReact;
