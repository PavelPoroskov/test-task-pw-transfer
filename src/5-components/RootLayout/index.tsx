import React from 'react';
import { Col, Row } from 'react-materialize';

const stylesRoot: React.CSSProperties = {
  marginBottom: 0
};

const RootLayout: React.FC = ({ children }) => {
  return (
    <Row style={stylesRoot}>
      <Col s={12} m={10} l={8} offset="m1 l2">
        {children}
      </Col>
    </Row>
  );
};

export default RootLayout;
