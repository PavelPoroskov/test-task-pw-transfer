import React, {useRef} from 'react';

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
  fontSize: '2em'
};
const UserInfoHeader: React.FC<UserInfoHeaderProps> = ({
  name,
  email,
  balance
}) => {
  const refSwitch = useRef(true);

  const classAnimation = refSwitch.current ? 'balance-odd' : 'balance-even';
  refSwitch.current = !refSwitch.current;

  return (
    <div style={styles}>
      <div>{name}</div>
      <div>{email}</div>
      <div>
        <div className={classAnimation}>{balance}</div>
      </div>
    </div>
  );
};

export default UserInfoHeader;
