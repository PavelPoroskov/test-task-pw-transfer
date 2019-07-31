import React from 'react';

interface Props {
  readonly onClick: (e: any) => void;
  readonly dataname?: string;
  readonly dataamount?: string;
}
const styleNew: React.CSSProperties = {
  lineHeight: '160%'
}
const LinkButton: React.FC<Props> = ({onClick,children,dataname,dataamount}) => {
  const extraProps: {[key: string]: any} = {};
  if (dataname) {
    extraProps['data-name'] = dataname;
  }
  if (dataamount) {
    extraProps['data-amount'] = dataamount;
  }
  return (
    <button type="button" className="link-button" onClick={onClick} style={styleNew}
      {...extraProps}
    >{children}</button>
  );
}

export default LinkButton;
