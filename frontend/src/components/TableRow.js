import React, { useState } from 'react';
import styled from 'styled-components';

const StyledRow = styled.div`
  td {
    text-align: center;
    padding: 0 0.5rem;
  }
`;

const IndexColor = styled.div`
  height: 3rem;
  width: 3rem;
  background-color: ${(props) => props.indexColor || 'black'};
  margin: 1rem auto;
`;

const DropdownButton = styled.div`
  text-align: center;
  background-color: #74a57f;
  border: none;
  color: white;
  font-size: 1.3rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  width: 3rem;
  padding: 10px;
`;

export default function TableRow({ name, color, children }) {
  const [open, setOpen] = useState(false);

  const toggle = () => {
    setOpen(!open);
  };
  return (
    <>
      <tr>
        <td>
          <IndexColor indexColor={color} />
        </td>{' '}
        <td>
          <h3>{name}</h3>
        </td>
        <td>
          <DropdownButton onClick={() => toggle(!open)}>Click</DropdownButton>
        </td>
      </tr>
      <tr>
        <td align="center" colspan="3">
          {open && <div className="dropdown-content">{children}</div>}
        </td>
      </tr>
    </>
  );
}
