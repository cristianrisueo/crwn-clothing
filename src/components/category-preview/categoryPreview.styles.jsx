import styled from "styled-components";

// Styled components

export const CategoryPreviewStyles = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 30px;
`;

export const TitleStyles = styled.h2`
  text-align: center;
  font-size: 30px;
  margin-bottom: 25px;
  cursor: pointer;
`;

export const PreviewStyles = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  column-gap: 20px;
`;
