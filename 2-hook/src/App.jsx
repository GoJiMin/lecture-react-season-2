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

const countContext = MyReact.createContext({});

const CountProvider = ({ children }) => {
  const [count, setCount] = React.useState(0);

  const value = { count, setCount };
  return (
    <countContext.Provider value={value}>{children}</countContext.Provider>
  );
};

const Count = () => {
  const { count } = MyReact.useContext(countContext);

  return <div>{count}</div>;
};

const PlusButton = () => {
  const { setCount } = MyReact.useContext(countContext);

  const handleClick = () => setCount((prev) => prev + 1);

  return <button onClick={handleClick}>+ 증가</button>;
};

export default () => (
  <CountProvider>
    <Count />
    <PlusButton />
  </CountProvider>
);
