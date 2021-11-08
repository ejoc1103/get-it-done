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
  padding-left: 40px;

  @media (max-width: 905px) {
    grid-template-columns: 1fr;
  }
`;

const Header = () => {
  const { id, setTheme } = useContext(ThemeContext);
  return (
    <div>
      <StyledHeader>
        Get It Done <Toggle isActive={id === "dark"} onToggle={setTheme} />
      </StyledHeader>
    </div>
  );
};

export default Header;
