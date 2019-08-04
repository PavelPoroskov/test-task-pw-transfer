import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSortNumericUpAlt, faSortNumericDown } from '@fortawesome/free-solid-svg-icons'
import LinkButton from '6-dsystem/LinkButton';

interface SortedColumnProps {
  readonly title: string;
  readonly onClick: () => void;
  readonly settings: {direction: null | number, order: null | number};
}
const styleText: React.CSSProperties = {
  fontWeight: 'bold',
};
const SortedColumn: React.FC<SortedColumnProps> = ({ onClick, title, settings }) => {
  const {direction, order} = settings;
  return (
    <LinkButton onClick={onClick}>
      <div style={styleText}>
      {title}  {direction && (direction === 1 ? <FontAwesomeIcon icon={faSortNumericDown} /> : <FontAwesomeIcon icon={faSortNumericUpAlt} />)} {order && `(${order})`}
      </div>
    </LinkButton>
  );
};

export default SortedColumn;
