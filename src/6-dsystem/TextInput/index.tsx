import React from 'react';

import MTextInput from "./TextInput";

const TextInput: React.FC<any> = ({errors, touched, values, ...restProps}) => {
  const name = restProps.name;
  const error = (errors[name] && touched[name] && errors[name]) || undefined;

  let value = ''
  if (values && values[name] !== undefined) {
    value = values[name]
    if (typeof value == 'number') {
      value = value === 0 ? '' : `${value}`
    }
  }

  return (
    <MTextInput 
      l={12}
      s={12}
      m={12}
      error={error}
      // value={value}
      defaultValue={value}
      inputClassName={error ? 'invalid' : ''}
      {...restProps}
    />
  );
}

export default TextInput;
