import React from 'react';

import MAutocomplete from './Autocomplete';

const Autocomplete: React.FC<any> = ({ error, ...restProps }) => {
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
};

export default Autocomplete;
