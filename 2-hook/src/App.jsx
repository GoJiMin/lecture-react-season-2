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

class Validation {
  constructor(rules) {
    this.rules = rules;
  }

  validateField(name, value) {
    const fieldRules = this.rules[name];

    if (!fieldRules) return "";

    for (const rule of fieldRules) {
      const errorMessage = rule(value);

      if (errorMessage) return errorMessage;
    }

    return "";
  }

  validate(formState) {
    const errors = {};

    for (const name in formState) {
      errors[name] = this.validateField(name, formState[name]);
    }

    return errors;
  }
}

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
  const [formState, setFormState] = React.useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = React.useState({
    email: "",
    password: "",
  });

  const validator = new Validation(rules);

  const validate = (formState) => {
    return validator.validate(formState);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormState((prevFormState) => ({
      ...prevFormState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = validate(formState);
    setErrors(validationErrors);

    if (Object.values(errors).some(Boolean)) return;

    console.log("Submitted", formState);
  };

  return (
    <form noValidate onSubmit={handleSubmit}>
      <input
        type="email"
        name="email"
        value={formState.email}
        onChange={handleChange}
        autoFocus
      />
      {errors.email && <p>{errors.email}</p>}
      <input
        type="password"
        name="password"
        value={formState.password}
        onChange={handleChange}
      />
      {errors.password && <p>{errors.password}</p>}
      <button onClick={handleSubmit}>Login</button>
    </form>
  );
};

export default LoginForm;
