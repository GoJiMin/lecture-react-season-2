import React from "react";
import MyReact from "../lib/MyReact";

// function useRegisterForm() {
//   const [state, dispatch] = React.useState({
//     values: { nickname: "", password: "" },
//     errors: { nickname: "", password: "" },
//   });

//   const handleChange = (e) => {
//     dispatch({
//       ...state,
//       values: {
//         ...state.values,
//         [e.target.name]: e.target.value,
//       },
//     });
//   };

//   const handleReset = () => {
//     dispatch({
//       values: { nickname: "", password: "" },
//       errors: { nickname: "", password: "" },
//     });
//   };

//   const handleSubmit = () => {
//     dispatch({
//       ...state,
//       errors: {
//         nickname: /^\w+$/.test(state.values.nickname)
//           ? ""
//           : "영문, 숫자만 입력해주세요.",
//         password: /^.{3,6}$/.test(state.values.password)
//           ? ""
//           : "3자 이상 6자 이하로 입력해주세요.",
//       },
//     });
//   };

//   return {
//     state,
//     handleChange,
//     handleReset,
//     handleSubmit,
//   };
// }

const initialValue = {
  values: { nickname: "", password: "" },
  errors: { nickname: "", password: "" },
};

function reducer(state, action) {
  const { type, name, value } = action;

  switch (type) {
    case "SET_FIELD":
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
      };
    case "RESET":
      return {
        values: { nickname: "", password: "" },
        errors: { nickname: "", password: "" },
      };
    case "VALIDATE":
      return {
        ...state,
        errors: {
          nickname: /^\w+$/.test(state.values.nickname)
            ? ""
            : "영문, 숫자만 입력해주세요.",
          password: /^.{3,6}$/.test(state.values.password)
            ? ""
            : "3자 이상 6자 이하로 입력해주세요.",
        },
      };
    default:
      throw "알 수 없는 액션입니다.";
  }
}

export default function RegisterForm() {
  const [state, dispatch] = MyReact.useReducer(reducer, initialValue);

  const handleChange = (e) => {
    dispatch({
      type: "SET_FIELD",
      name: e.target.name,
      value: e.target.value,
    });
  };

  const handleReset = () => dispatch({ type: "RESET" });

  const handleSubmit = () => dispatch({ type: "VALIDATE" });

  return (
    <>
      <div>
        <label htmlFor="nickname">닉네임</label>
        <input
          type="text"
          id="nickname"
          name="nickname"
          value={state.values.nickname}
          onChange={handleChange}
        />
        <span>{state.errors.nickname}</span>
      </div>
      <div>
        <label htmlFor="password">비밀번호</label>
        <input
          type="password"
          id="password"
          name="password"
          value={state.values.password}
          onChange={handleChange}
        />
        <span>{state.errors.password}</span>
      </div>
      <button onClick={handleReset}>초기화</button>
      <button onClick={handleSubmit}>회원가입</button>
    </>
  );
}
