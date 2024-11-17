import React from "react";

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

const getInitialState = (values) => ({
  values,
  touched: {},
  errors: {},
});

const formReducer = (state, action) => {
  const { type, name, value, validator } = action;

  switch (type) {
    case "SET_VALUES":
      return {
        ...state,
        values: {
          ...state.values,
          [name]: value,
        },
      };
    case "SET_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          [name]: true,
        },
      };
    case "SET_TOUCHED_ALL":
      return {
        ...state,
        touched: Object.keys(state.values).reduce((touched, state) => {
          touched[state] = true;

          return touched;
        }, {}),
      };
    case "VALIDATE":
      return {
        ...state,
        errors: validator.valdate(state.values),
      };
    default:
      throw `알 수 없는 액션입니다. ${action}`;
  }
};

export const useForm = ({ initialValues, rules, onSubmit }) => {
  const [formState, dispatch] = React.useReducer(
    formReducer,
    getInitialState(initialValues)
  );

  const validator = new Validation(rules);

  const handleBlur = (e) => dispatch({ type: "TOUCHED", name: e.target.name });

  const handleChange = (e) =>
    dispatch({
      type: "SET_VALUES",
      name: e.target.name,
      value: e.target.value,
    });

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch({ type: "TOUCHED_ALL" });

    const nextState = formReducer(formState, { type: "VALIDATE", validator });

    if (Object.values(nextState.errors).some(Boolean)) return;

    onSubmit(formState);
  };

  const getFieldProps = (name) => {
    const value = formState[name];
    const onBlur = handleBlur;
    const onChange = handleChange;

    return {
      name,
      value,
      onBlur,
      onChange,
    };
  };

  React.useEffect(() => {
    dispatch({ type: "VALIDATE", validator });
  }, [formState]);

  return {
    ...formState,
    handleChange,
    handleBlur,
    handleSubmit,
    getFieldProps,
  };
};

const formContext = React.createContext();

export const Form = ({ id, className, children, ...rest }) => {
  const formValue = useForm(rest);

  return (
    <formContext.Provider value={formValue}>
      <form
        noValidate
        id={id}
        className={className}
        onSubmit={formValue.handleSubmit}
      >
        {children}
      </form>
    </formContext.Provider>
  );
};

export const Field = ({ as = "input", children, ...rest }) => {
  const { getFieldProps } = React.useContext(formContext);

  return React.createElement(
    as,
    { ...rest, ...getFieldProps(rest.name) },
    children
  );
};

export const ErrorMessage = ({ name }) => {
  const { touched, errors } = React.useContext(formContext);

  if (!touched[name] || !errors[name]) return null;

  return <p>{errors[name]}</p>;
};
