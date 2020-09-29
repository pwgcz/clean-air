import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.input`
  width: 100%;
  height: 100%;
  border: 0;
  border-bottom: 2px solid #74a57f;
  outline: 0;
  font-size: 1.3rem;
  padding: 7px 0;
  background: transparent;
`;

export default function TextInput() {
  return <StyledInput type="text" />;
}
