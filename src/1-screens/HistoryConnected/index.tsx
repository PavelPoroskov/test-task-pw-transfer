import React from 'react';
import { Row, Col, Collapsible, CollapsibleItem } from 'react-materialize';

import { connect } from 'react-redux';
import { RootState } from '4-store/types';
import { filterSettings } from '4-store/selectors';

import HistoryFilterFormConnected from './HistoryFilterFormConnected';
import HistoryTableConnected from './HistoryTableConnected';

const mapStateToProps = (state: RootState) => ({
  strFilterSettings: filterSettings(state)
});
type StateProps = ReturnType<typeof mapStateToProps>;

const HistoryConnectedView: React.FC<StateProps> = ({ strFilterSettings }) => {
  return (
    <div>
      <Row>
        <Col l={12} m={12} s={12}>
          <h5 className="center-align">History</h5>
        </Col>
      </Row>
      <Collapsible accordion={false} className="filter-expandable">
        <CollapsibleItem header={`Filter: ${strFilterSettings}`}>
          <HistoryFilterFormConnected />
        </CollapsibleItem>
      </Collapsible>

      <HistoryTableConnected />
    </div>
  );
};

export default connect(mapStateToProps)(HistoryConnectedView);
