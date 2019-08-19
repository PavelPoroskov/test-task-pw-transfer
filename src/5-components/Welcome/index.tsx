import React from 'react';

interface WelcomeProps {
  readonly username: string;
}
const container: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  flex: 1
};
const first: React.CSSProperties = {
  marginTop: '7%'
};
const Welcome: React.FC<WelcomeProps> = ({ username }) => {
  return (
    <div style={container}>
      <div style={first}>
        <h3>Welcome, {username}!</h3>
      </div>
      <div>
        <h5>You are awarded with an initial balance of 500 PW.</h5>
      </div>
    </div>
  );
};

export default Welcome;
