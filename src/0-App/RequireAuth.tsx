import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { connect } from 'react-redux';
import { RootState } from '4-store/types';

const mapStateToProps = ({ auth }: RootState) => ({
  logged: auth.logged
});

function RequireAuth({ logged, children }: { logged: boolean, children: JSX.Element }) {
  // console.log('in RequireAuth');
  const navigate = useNavigate();

  useEffect(() => {
    if (!logged) {
      navigate("/login");
    }
  }, [logged]);

  return children;
}

export default connect(mapStateToProps)(RequireAuth);