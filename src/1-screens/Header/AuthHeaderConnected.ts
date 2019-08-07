import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { requestLogout } from '4-store/modules/auth';
import AuthHeader from '5-components/AuthHeader';

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    logout: () => dispatch(requestLogout())
  };
};

export default connect(
  null,
  mapDispatchToProps
)(AuthHeader);
