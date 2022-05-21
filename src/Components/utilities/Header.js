import React, { useContext } from "react";
import styled, { ThemeContext } from "styled-components";
import Toggle from "./Toggle";
const StyledHeader = styled.header`
  display: grid;
  grid-template-columns: 2fr 1fr;
  width: 100%;
  font-size: 4em;
  font-family: "Roboto Slab", serif;
  justify-self: start;
  font-weight: 800;
  color: ${({ theme }) => theme.secondaryColor};
  padding: 0 40px 0 10px;

  @media (max-width: 920px) {
    grid-template-columns: 1fr;
  }
  @media (max-width: 800px) {
    text-align: center;
    grid-column: span 2;
    justify-self: center;
  }
`;

const Header = () => {
  const { id, setTheme } = useContext(ThemeContext);
  return (
    <StyledHeader>
      Get It Done <Toggle isActive={id === "dark"} onToggle={setTheme} />
    </StyledHeader>
  );
};

export default Header;
