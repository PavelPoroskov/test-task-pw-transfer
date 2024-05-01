import React from 'react';

// @ts-ignore
import MDatePicker from './DatePicker';

const DatePicker: React.FC<any> = ({ value, onSelect, ...restProps }) => {
  const options: { [name: string]: any } = {
    autoClose: true,
    format: 'yyyy-m-d',
    onSelect
  };
  if (value) {
    options['defaultDate'] = new Date(value);
    options['setDefaultDate'] = true;
  } else {
    options['defaultDate'] = null;
    options['setDefaultDate'] = false;
  }
  return (
    <MDatePicker
      l={12}
      s={12}
      m={12}
      value={value}
      options={options}
      onChange={() => {}}
      {...restProps}
    />
  );
};

export default DatePicker;
