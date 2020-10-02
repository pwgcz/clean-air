import React, { useState } from 'react';
import styled from 'styled-components/macro';
import TextInput from './TextInput';
import Button from './Button';

const SearchWrapper = styled.div`
  width: 60vw;
  margin: 3rem auto;
`;

export default function Search({ getSearchResult, isInDatabase }) {
  const [input, setInput] = useState('');

  const chandleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <SearchWrapper>
      <form onSubmit={getSearchResult}>
        <TextInput value={input} onChange={chandleChange} isInDatabase={isInDatabase} />
        <Button name="Search" />
      </form>
    </SearchWrapper>
  );
}
