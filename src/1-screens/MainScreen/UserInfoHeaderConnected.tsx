import { connect } from 'react-redux';

import {AppStoreState} from '4-store'
import UserInfoHeader from '5-components/UserInfoHeader'

// const UserInfoHeaderConnected: React.FC = () => {

//   return <UserInfoHeader name="John Test" email="john.test@gmail.com" balance={123}/>;
// }

// export default UserInfoHeaderConnected;

const mapStateToProps = ({userinfo}: AppStoreState /*, ownProps*/) => ({
  name: userinfo.name,
  email: userinfo.email,
  balance: userinfo.balance,
})

export default connect(mapStateToProps)(UserInfoHeader);
