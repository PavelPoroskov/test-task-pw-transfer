import React from 'react';
import { Row, Col } from 'react-materialize';

import { connect } from 'react-redux';
import { Dispatch } from 'redux';
import { RootState } from '4-store/types';
import { chooseFilter } from '4-store/modules/front';
import { filterSettings } from '4-store/selectors';

import LinkButton from '6-dsystem/LinkButton';
import HistoryFilterFormConnected from './HistoryFilterFormConnected';
import HistoryTableConnected from './HistoryTableConnected';

const styleMenu: React.CSSProperties = {
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between', //? compatibility
  paddingLeft: '5px',
  paddingRight: '5px'
};

const mapStateToProps = (state: RootState) => ({
  showFilter: state.front.showFilter,
  strFilterSettings: filterSettings(state)
});
const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    chooseFilter: (show: boolean) => dispatch(chooseFilter(show))
  };
};
type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = ReturnType<typeof mapDispatchToProps>;
type Props = StateProps & DispatchProps;

const HistoryConnectedView: React.FC<Props> = ({
  showFilter,
  chooseFilter,
  strFilterSettings
}) => {
  return (
    <div>
      <Row>
        <Col l={12} m={12} s={12}>
          <h5 className="center-align">History</h5>
        </Col>
      </Row>
      <div style={styleMenu}>
        {!showFilter && (
          <LinkButton onClick={() => chooseFilter(true)}>
            Edit Filter: {strFilterSettings}
          </LinkButton>
        )}
        {showFilter && (
          <LinkButton onClick={() => chooseFilter(false)}>
            Hide Filter: {strFilterSettings}
          </LinkButton>
        )}
      </div>

      {showFilter && <HistoryFilterFormConnected />}
      <HistoryTableConnected />
    </div>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HistoryConnectedView);
