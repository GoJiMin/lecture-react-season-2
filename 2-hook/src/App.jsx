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

import * as MyForm from "./lib/MyForm";

const rules = {
  email: [
    (value) => (!value ? "이메일을 입력해주세요." : ""),
    (value) => {
      const emailRegex = new RegExp(/^[^\s@]{6,}@[^\s@]+\.[^\s@]+$/);

      if (!emailRegex.test(value)) {
        return "유효하지 않은 이메일 형식입니다.";
      } else {
        return "";
      }
    },
  ],
  password: [
    (value) => (!value ? "비밀번호를 입력해주세요." : ""),
    (value) => (value.length < 6 ? "비밀번호는 6자 이상이어야 합니다." : ""),
  ],
};

const LoginForm = () => {
  const onSubmit = (formState) => {
    console.log("Submitted", formState);
  };

  const { touched, errors, handleSubmit, getFieldProps } = MyForm.useForm({
    initialValues: { email: "", password: "" },
    rules,
    onSubmit,
  });

  return (
    <form noValidate onSubmit={handleSubmit}>
      <input type="email" name="email" autoFocus {...getFieldProps("email")} />
      {touched.email && errors.email && <p>{errors.email}</p>}
      <input type="password" name="password" {...getFieldProps("password")} />
      {touched.password && errors.password && <p>{errors.password}</p>}
      <button>Login</button>
    </form>
  );
};

export default LoginForm;
