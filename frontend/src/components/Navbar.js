import React from 'react';
import styled from 'styled-components';
import Logo from '../Icons/icons8-sakura-96.png';

const StyledNav = styled.nav`
  display: flex;
  justify-content: space-around;
  align-items: center;
  min-height: 15vh;
  width: 100%;
  background: #74a57f;
  color: #e8e9e7;
  a {
    color: white;
    text-decoration: none;
    font-size: 40px;
    font-weight: bold;
  }
`;

export default function Navbar() {
  return (
    <StyledNav>
      <img src={Logo} alt="logo" />
      <a href="/">Clean Air</a>
    </StyledNav>
  );
}
