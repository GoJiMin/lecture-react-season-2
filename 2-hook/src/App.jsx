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

const LoginForm = () => {
  const formRef = React.useRef(null);

  const getInputValueByName = (name) => {
    if (!formRef) return;

    const inputElement = formRef.current.elements[name];

    if (!inputElement) return;

    return inputElement.value;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const email = getInputValueByName("email");
    const password = getInputValueByName("password");

    console.log("email", email);
    console.log("password", password);
  };
  return (
    <form ref={formRef} onSubmit={handleSubmit}>
      <input type="email" name="email" required autoFocus />
      <input type="password" name="password" required />
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
