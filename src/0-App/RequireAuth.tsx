import { Navigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '4-store/types';

const mapStateToProps = ({ auth }: RootState) => ({
  logged: auth.logged
});

function RequireAuth({ logged, children }: { logged: boolean, children: JSX.Element }) {
    if (!logged) {
        // Redirect them to the /login page, but save the current location they were
        // trying to go to when they were redirected. This allows us to send them
        // along to that page after they login, which is a nicer user experience
        // than dropping them off on the home page.
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default connect(mapStateToProps)(RequireAuth);