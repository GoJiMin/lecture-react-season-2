// const App = () => <>2-hook</>;

// export default App;

import React from "react";
import MyReact from "./lib/MyReact";

const Counter = () => {
  MyReact.resetCursor();

  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");

  const handleClick = () => setCount(count + 1);

  const handleChangeName = (e) => setName(e.target.value);

  MyReact.useEffect(() => {
    const storedName = localStorage.getItem("name") || "";
    if (storedName !== name) {
      setName(storedName);
    }
    console.log("effect3");
  }, []);

  MyReact.useEffect(() => {
    document.title = `count: ${count} | name: ${name}`;
    console.log("effect1");

    return function cleanUp() {
      document.title = "";
      console.log("effect1 cleanUp");
    };
  }, [name, count]);

  MyReact.useEffect(() => {
    localStorage.setItem("name", name);
    console.log("effect2");
  }, [name]);

  console.log("Counter rendered");

  return (
    <>
      <input type="text" value={name} onChange={handleChangeName} />
      <button onClick={handleClick}>더하기</button>
    </>
  );
};

export default () => {
  const [mounted, setMounted] = React.useState(false);

  const handleToggle = () => {
    setMounted((prevMounted) => {
      const nextMounted = !prevMounted;

      if (!nextMounted) MyReact.cleanUpEffects();

      return nextMounted;
    });
  };
  return (
    <>
      <button onClick={handleToggle}>컴포넌트 토글</button>
      {mounted && <Counter />}
    </>
  );
};
