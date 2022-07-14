import styled from "styled-components";

// Styled components

export const CategoryTitleStyles = styled.h2`
  font-size: 40px;
  text-align: center;
  margin-bottom: 25px;
  cursor: pointer;
`;

export const CategoryContainerStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
  row-gap: 50px;
`;
