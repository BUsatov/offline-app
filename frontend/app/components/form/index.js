import React, { useReducer, useEffect, useContext } from "react";
import Text from "@material-ui/core/TextField";
import RadioGroup from "@material-ui/core/RadioGroup";
import MultiInput from "app/components/multi-input";

function defaultReducer(state, action) {
  switch (action.type) {
    case "reset":
      return { ...action.payload };
    case "set":
      return { ...state, [action.name]: action.value };
    case "setValues":
      return { ...action.payload };
    default:
      return state;
  }
}

export const FormContext = React.createContext({});

export function Form(props) {
  const {
    initialValues = {},
    validate = () => null,
    initialErrors = {},
    reducer = defaultReducer,
    onSubmit = () => null,
    children
  } = props;
  const [values, dispatch] = useReducer(reducer, initialValues);
  const [errors, errorDispatch] = useReducer(reducer, initialErrors);
  const formProps = {
    values,
    errors,
    runValidations: async vals => {
      const validateErrors = await validate(vals);
      errorDispatch({ type: "setValues", payload: validateErrors });
    },
    setFieldValue: (name, value) => dispatch({ type: "set", name, value }),
    handleSubmit: e => {
      e.preventDefault();
      onSubmit(values);
    },
    handleReset: e => {
      dispatch({ type: "reset", payload: initialValues });
    }
  };

  useEffect(() => {
    formProps.runValidations(values);
  }, [values]);
  return (
    <FormContext.Provider value={formProps}>{children}</FormContext.Provider>
  );
}

export function TextField(props) {
  const { name, ...otherProps } = props;
  const { values, setFieldValue } = useContext(FormContext);

  return React.createElement(Text, {
    value: values[name],
    onChange: e => setFieldValue(name, e.target.value),
    ...otherProps
  });
}

export function MultiInputField(props) {
  const { name, ...otherProps } = props;
  const { values, setFieldValue } = useContext(FormContext);

  return React.createElement(MultiInput, {
    value: values[name],
    onChange: value => setFieldValue(name, value),
    ...otherProps
  });
}

export function RadioGroupField(props) {
  const { name, ...otherProps } = props;
  const { values, setFieldValue } = useContext(FormContext);

  return React.createElement(RadioGroup, {
    value: values[name],
    onChange: e => setFieldValue(name, e.target.value),
    ...otherProps
  });
}
