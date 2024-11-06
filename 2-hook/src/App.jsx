// const App = () => <>2-hook</>;

// export default App;

import React from "react";
import MyReact from "./lib/MyReact";

const Counter = () => {
  MyReact.resetCursor();

  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState(localStorage.getItem("name") || "");

  const handleClick = () => setCount(count + 1);

  const handleChangeName = (e) => setName(e.target.value);

  MyReact.useEffect(() => {
    document.title = `count: ${count} | name: ${name}`;
    console.log("effect1");
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

export default Counter;
