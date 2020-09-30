import React, { useState } from 'react';
import styled from 'styled-components/macro';
import TextInput from './TextInput';
import Button from './Button';

const SearchWrapper = styled.div`
  width: 80vw;
  margin: 3rem auto;
`;

export default function Search({ getSearchResult }) {
  const [input, setInput] = useState('');

  const chandleChange = (event) => {
    setInput(event.target.value);
  };

  return (
    <SearchWrapper>
      <form onSubmit={getSearchResult}>
        <TextInput value={input} onChange={chandleChange} />
        <Button name="Search" />
      </form>
    </SearchWrapper>
  );
}
