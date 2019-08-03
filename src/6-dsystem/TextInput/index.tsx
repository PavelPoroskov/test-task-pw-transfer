import React from 'react';

import MTextInput from './TextInput';

const TextInput: React.FC<any> = ({ error, ...restProps }) => {
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
};

export default TextInput;
