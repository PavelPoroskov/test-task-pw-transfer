import React from 'react';

// import { TextInput as MTextInput } from "react-materialize";
import MTextInput from "./TextInput";

//error={errors.email && touched.email && errors.email}
const TextInput: React.FC<any> = ({errors, touched, values, ...restProps}) => {
  const name = restProps.name;
  const error = (errors[name] && touched[name] && errors[name]) || undefined;

  return (
    <MTextInput 
      l={12}
      s={12}
      m={12}
      error={error}
      inputClassName={error ? 'invalid' : ''}
      {...restProps}
    />
  );
}

export default TextInput;
