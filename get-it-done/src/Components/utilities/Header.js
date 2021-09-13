import React from "react";
import styled from "styled-components";

const StyledHeader = styled.h1`
  display: grid;
  width: 100%;
  font-size: 4em;
  font-family: "Roboto Slab", serif;
  justify-self: start;
  font-weight: 800;
  color: #314e52;
  padding-left: 40px;
`;

const Header = () => {
  return <StyledHeader>Get It Done</StyledHeader>;
};

export default Header;
