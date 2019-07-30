import React from 'react';

import LinkButton from '6-dsystem/LinkButton'

interface AuthHeaderProps {
  // readonly openRegister: () => void;
  // readonly openLogin: () => void;
  readonly openLogout: () => void;
}
const container: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  padding: '0.5em 1em',
  backgroundColor: '#0A0',
  alignItems: 'center'
  // justifyContent: 'flex-end',
};
const left: React.CSSProperties = {
  flex: 1,
  fontSize: '1.5em',
  fontWeight: 'bold',
};
const right: React.CSSProperties = {
  // flex: 1,
};
const AuthHeader: React.FC<AuthHeaderProps> = ({openLogout}) => {
  return (
    <div style={container}>
      <div style={left}>
        PW Transfer
      </div>
      <div style={right}>
        <LinkButton onClick={openLogout}>Logout</LinkButton>
      </div>
    </div>
  );
}

export default AuthHeader;
