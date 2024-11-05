// const App = () => <>2-hook</>;

// export default App;

import React from "react";
import MyReact from "./lib/MyReact";

const Counter = () => {
  const [count, setCount] = React.useState(0);
  const [name, setName] = React.useState("");

  const handleClick = () => setCount(count + 1);

  const handleChangeName = (e) => setName(e.target.value);

  MyReact.useEffect(() => {
    document.title = `count: ${count}`;
    console.log("effect1");
  }, count);

  console.log("Counter rendered");

  return (
    <>
      <input type="text" value={name} onChange={handleChangeName} />
      <button onClick={handleClick}>더하기</button>
    </>
  );
};

export default Counter;
