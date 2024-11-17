import React from "react";

function useRegisterForm() {
  const [state, setState] = React.useState({
    values: { nickname: "", password: "" },
    errors: { nickname: "", password: "" },
  });

  const handleChange = (e) => {
    setState({
      ...state,
      values: {
        ...state.values,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleReset = () => {
    setState({
      values: { nickname: "", password: "" },
      errors: { nickname: "", password: "" },
    });
  };

  const handleSubmit = () => {
    setState({
      ...state,
      errors: {
        nickname: /^\w+$/.test(state.values.nickname)
          ? ""
          : "영문, 숫자만 입력해주세요.",
        password: /^.{3,6}$/.test(state.values.password)
          ? ""
          : "3자 이상 6자 이하로 입력해주세요.",
      },
    });
  };

  return {
    state,
    handleChange,
    handleReset,
    handleSubmit,
  };
}

export default function RegisterForm() {
  const { state, handleChange, handleReset, handleSubmit } = useRegisterForm();

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
