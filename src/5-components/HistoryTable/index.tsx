import React from 'react';
import { Table } from 'react-materialize';
import LinkButton from '6-dsystem/LinkButton';
import SortedColumn from '5-components/SortedCollumn';

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
  copyTransaction: (input: { name: string; amount: number }) => void;
  updateSoringDate: () => void;
  updateSoringCorrespondent: () => void;
  updateSoringAmount: () => void;
}

const History: React.FC<HistoryProps> = ({
  list,
  copyTransaction,
  updateSoringDate,
  updateSoringCorrespondent,
  updateSoringAmount,
  columnsSettings
}) => {
  const onClick = (e: any) => {
    const ds = e.target.dataset;
    copyTransaction({
      name: ds.name,
      amount: ds.amount
    });
  };
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
              <LinkButton
                data-name={item.username}
                data-amount={`${Math.max(item.amount, -item.amount)}`}
                onClick={onClick}
              >
                Copy
              </LinkButton>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default History;
