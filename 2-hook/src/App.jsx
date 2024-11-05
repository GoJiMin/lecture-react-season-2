// const App = () => <>2-hook</>;

// export default App;

import React from "react";
import MyReact from "./lib/MyReact";

const Counter = () => {
  const [count, setCount] = React.useState(0);

  MyReact.useEffect(() => {
    document.title = `count: ${count}`;
    console.log("effect1");
  });

  const handleClick = () => setCount(count + 1);

  console.log("Counter rendered");

  return <button onClick={handleClick}>더하기</button>;
};

export default Counter;
