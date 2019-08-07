import React from 'react';
import { Table } from 'react-materialize';
import SortedColumn from '5-components/SortedCollumn';
import RouterLink from '6-dsystem/RouterLink';

export interface Transaction {
  id: number;
  date: string;
  username: string;
  amount: number;
  balance: number;
}
export interface HistoryProps {
  list: Transaction[];
  columnsSettings: {
    [name: string]: { direction: null | number; order: null | number };
  };
  updateSoringDate: () => void;
  updateSoringCorrespondent: () => void;
  updateSoringAmount: () => void;
}

const History: React.FC<HistoryProps> = ({
  list,
  updateSoringDate,
  updateSoringCorrespondent,
  updateSoringAmount,
  columnsSettings
}) => {
  return (
    <Table className="highlight">
      <thead>
        <tr>
          <th>
            <SortedColumn
              title="Date/Time"
              onClick={updateSoringDate}
              settings={columnsSettings['date']}
            />
          </th>
          <th>
            <SortedColumn
              title="Correspondent"
              onClick={updateSoringCorrespondent}
              settings={columnsSettings['username']}
            />
          </th>
          <th className="right-align">
            <SortedColumn
              title="Amount"
              onClick={updateSoringAmount}
              settings={columnsSettings['amount']}
            />
          </th>
          <th className="right-align">Balance</th>
          <th className="center-align">Action</th>
        </tr>
      </thead>
      <tbody>
        {list.map(item => (
          <tr key={item.id}>
            <td>{item.date}</td>
            <td>{item.username}</td>
            <td className="right-align">{item.amount}</td>
            <td className="right-align">{item.balance}</td>
            <td className="center-align">
              <RouterLink
                to={{
                  pathname: '/transaction',
                  state: {
                    name: item.username,
                    amount: `${Math.max(item.amount, -item.amount)}`
                  }
                }}
              >
                Copy
              </RouterLink>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default History;
