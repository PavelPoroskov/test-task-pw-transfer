import { connect } from 'react-redux';

import {RootState} from '4-store/types'
import UserInfoHeader from '5-components/UserInfoHeader'

const mapStateToProps = ({userinfo}: RootState /*, ownProps*/) => ({
  name: userinfo.name,
  email: userinfo.email,
  balance: userinfo.balance,
})

export default connect(mapStateToProps)(UserInfoHeader);
