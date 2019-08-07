import { connect } from 'react-redux';

import { RootState } from '4-store/types';
import Welcome from '5-components/Welcome';

const mapStateToProps = ({ userinfo }: RootState) => ({
  username: userinfo.name
});

export default connect(mapStateToProps)(Welcome);
