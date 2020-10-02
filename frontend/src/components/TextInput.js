import React from 'react';
import styled from 'styled-components';

const StyledInput = styled.div`
  input {
    width: 100%;
    height: 100%;
    border: 0;
    border-bottom: ${(props) => (props.isInDatabase ? '2px solid #74a57f' : '2px solid red')};
    outline: 0;
    font-size: 1.3rem;
    padding: 7px 1rem;
    background: transparent;
  }
  small {
    visibility: ${(props) => (props.isInDatabase ? 'hidden' : 'visible')};
    font-size: 1rem;
    display: flex;
    margin: 4px;
    justify-content: center;
    color: red;
    align: center;
  }
`;

export default function TextInput({ onChange, value, isInDatabase }) {
  console.log(isInDatabase);
  return (
    <StyledInput isInDatabase={isInDatabase}>
      <input type="text" onChange={onChange} value={value} />
      <small>not found in database </small>
    </StyledInput>
  );
}
