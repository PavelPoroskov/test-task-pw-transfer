import React from 'react';
import { Table, Row, Col } from "react-materialize";
import LinkButton from "6-dsystem/LinkButton"

export interface Transaction {
  id: number,
  date: string,
  username: string,
  amount: number,
  balance: number,
};
export interface HistoryProps {
  list: Transaction[],
  copyTransaction: (input: {name: string, amount: number}) => void
};

const History: React.FC<HistoryProps> = ({ list, copyTransaction }) => {
  const onClick = (e: any) => {
    const ds = e.target.dataset;
    copyTransaction({
      name: ds.name,
      amount: ds.amount,
    })
  }
  return (
    <div>
      <Row>
        <Col l={12} m={12} s={12}>
          <h5 className="center-align">History</h5> 
        </Col>
      </Row>
      <Table className="highlight">
        <thead>
          <tr>
            <th>Date/Time</th>
            <th>Correspondent</th>
            <th className="right-align">Amount</th>
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
              <LinkButton dataname={item.username} dataamount={`${Math.max(item.amount,-item.amount)}`} onClick={onClick}>
                Copy
              </LinkButton>
            </td>
          </tr>
        ))}
        </tbody>
      </Table>
    </div>
  );
}

export default History;
