import { connect } from 'react-redux';

import {AppStoreState} from '4-store'
import UserInfoHeader from '5-components/UserInfoHeader'

const mapStateToProps = ({userinfo}: AppStoreState /*, ownProps*/) => ({
  name: userinfo.name,
  email: userinfo.email,
  balance: userinfo.balance,
})

export default connect(mapStateToProps)(UserInfoHeader);
