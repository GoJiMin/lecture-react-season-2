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
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Submitted", formState);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formState.email}
        onChange={handleChange}
        autoFocus
      />
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={handleChange}
      />
      <button onClick={handleSubmit}>Login</button>
    </form>
  );
};

export default LoginForm;
