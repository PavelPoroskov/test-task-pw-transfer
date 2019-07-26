import React from 'react';

interface UserInfoHeaderProps {
  readonly name: string;
  readonly email: string;
  readonly balance: number;
}
const styles: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  padding: '1em 1em',
  backgroundColor: 'lightyellow',
  justifyContent: 'space-between', //? compatibility
  fontSize: '2em',
};
const UserInfoHeader: React.FC<UserInfoHeaderProps> = ({name, email, balance}) => {
  return (
    <div style={styles}>
      <div>{name}</div>
      <div>{email}</div>
      <div>{balance}</div>
    </div>
  );
}

export default UserInfoHeader;
