import React from 'react';
import styled from 'styled-components/macro';
import TextInput from './TextInput';
import Button from './Button';

const SearchWrapper = styled.div`
  width: 80vw;
  margin: 3rem auto;
`;

export default function Search() {
  const handleSubmit = (event) => {};

  return (
    <SearchWrapper>
      <form onSubmit={handleSubmit}>
        <TextInput />
        <Button name="Search" />
      </form>
    </SearchWrapper>
  );
}
