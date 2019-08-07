import React from 'react';
import { Link } from 'react-router-dom';

const RouterLink: React.FC<any> = ({ children, ...extraProps }) => {
  return (
    <Link className="link-button" {...extraProps}>
      {children}
    </Link>
  );
};

export default RouterLink;
