import React from 'react';

interface Props {
  readonly onClick: () => void;
}
const styleNew: React.CSSProperties = {
  lineHeight: '160%'
}
const LinkButton: React.FC<Props> = ({onClick,children}) => {
  return (
    <button type="button" className="link-button" onClick={onClick} style={styleNew}>{children}</button>
  );
}

export default LinkButton;
