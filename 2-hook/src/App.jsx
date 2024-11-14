import React from "react";
import MyReact from "./lib/MyReact";
import CartPage from "./pages/CartPage";
import OrderPage from "./pages/OrderPage";
import ProductPage from "./pages/ProductPage";

// const App = () => (
//   <>
//     {/* <ProductPage /> */}
//     {/* <CartPage /> */}
//     <OrderPage />
//   </>
// );

// export default App;

export default () => {
  const ref1 = MyReact.useRef(1);
  const ref2 = MyReact.useRef(null);

  const [state, setState] = React.useState(0);
  const handleClick = () => setState((prev) => prev + 1);

  return (
    <>
      <h1>Test</h1>
      <button onClick={handleClick}>state: {state}</button>
      <p>ref1: {ref1.current}</p>
      <div>
        <input type="text" ref={ref2} />
        <button
          onClick={() => {
            console.log("input ref: ", ref2.current.value);
          }}
        >
          ref2 조회
        </button>
      </div>
    </>
  );
};
