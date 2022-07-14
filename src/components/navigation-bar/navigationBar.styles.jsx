import styled from "styled-components";

// React components
import { Link } from "react-router-dom";

// Styled components

export const NavigationBarStyles = styled.div`
  height: 70px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 25px;
  box-shadow: 0px 1px 8px #7c8371;
`;

export const LogoContainerStyles = styled(Link)`
  width: 70px;
  padding: 15px;
`;

export const LinksContainerStyles = styled.div`
  width: 50%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

export const LinkStyles = styled(Link)`
  padding: 10px 15px;
  cursor: pointer;
`;
