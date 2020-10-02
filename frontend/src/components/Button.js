import React from 'react';
import styled from 'styled-components';

const StyledButton = styled.button`
  text-align: center;
  background-color: #74a57f;
  border: none;
  color: white;
  font-size: 1.3rem;
  box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  border-radius: 5px;
  padding: 10px;
`;

export default function Button({ name }) {
  return <StyledButton type="submit">{name}</StyledButton>;
}
