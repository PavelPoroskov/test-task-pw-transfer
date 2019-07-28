import React from 'react';

interface Props {
  readonly onClick: () => void;
}
const LinkButton: React.FC<Props> = ({onClick,children}) => {
  return (
    <button type="button" className="link-button" onClick={onClick}>{children}</button>
  );
}

export default LinkButton;
