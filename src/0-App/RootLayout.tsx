import React from 'react';
import { Col, Row } from 'react-materialize';
import { Outlet } from "react-router-dom";

const stylesRoot: React.CSSProperties = {
  marginBottom: 0
};

const RootLayout: React.FC = () => {
  return (
    <Row style={stylesRoot}>
      <Col s={12} m={10} l={8} offset="m1 l2">
        <Outlet />
      </Col>
    </Row>
  );
};

export default RootLayout;
