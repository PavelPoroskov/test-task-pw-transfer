import React from 'react';

import MAutocomplete from "./Autocomplete";

const Autocomplete: React.FC<any> = ({errors, touched, values, ...restProps}) => {
  const name = restProps.name;
  const error = (errors[name] && touched[name] && errors[name]) || undefined;

  return (
    <MAutocomplete 
      l={12}
      s={12}
      m={12}
      error={error}
      inputClassName={error ? 'invalid' : ''}
      {...restProps}
    />
  );
}

export default Autocomplete;
