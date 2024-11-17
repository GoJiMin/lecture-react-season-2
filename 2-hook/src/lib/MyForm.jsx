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

export const useForm = ({ initialValues, rules, onSubmit }) => {
  const [formState, setFormState] = React.useState(initialValues);
  const [errors, setErrors] = React.useState({});
  const [touched, setTouched] = React.useState({});

  const validator = new Validation(rules);

  const validate = (formState) => {
    return validator.validate(formState);
  };

  const handleBlur = (e) => {
    const nextTouched = {
      ...touched,
      [e.target.name]: true,
    };

    setTouched(nextTouched);
  };

  const handleChange = (e) => {
    const nextStates = {
      ...formState,
      [e.target.name]: e.target.value,
    };

    setFormState(nextStates);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const nextTouched = Object.keys(formState).reduce((touched, state) => {
      touched[state] = true;
      return touched;
    }, {});

    setTouched(nextTouched);

    const validationErrors = validate(formState);
    setErrors(validationErrors);

    if (Object.values(validationErrors).some(Boolean)) return;

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
    setErrors(validate(formState));
  }, [formState]);

  return {
    formState,
    touched,
    errors,
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
