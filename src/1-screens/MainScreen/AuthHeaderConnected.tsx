import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk'

import { logout } from '4-store/modules/auth'
import AuthHeader from '5-components/AuthHeader'

interface DispatchProps {
  logout: () => void,
}

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): DispatchProps => {
  return {
    logout: () => dispatch(logout())
  }
}

export default connect(null,mapDispatchToProps)(AuthHeader);
