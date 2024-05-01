import React, { ReactNode } from 'react';

interface Props {
  readonly onClick: (e: any) => void;
  children: ReactNode
}
const styleNew: React.CSSProperties = {
  lineHeight: '160%'
};
const LinkButton: React.FC<Props> = ({ onClick, children, ...extraProps }) => {
  return (
    <button
      type="button"
      className="link-button"
      onClick={onClick}
      style={styleNew}
      {...extraProps}
    >
      {children}
    </button>
  );
};

export default LinkButton;
