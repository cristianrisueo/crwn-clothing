import styled from "styled-components";

// Logo component
import { ReactComponent as ShoppingIcon } from "../../assets/shopping-bag.svg";

// Styled components

export const CartIconStyles = styled.div``;

export const ShoppingIconStyles = styled(ShoppingIcon)`
  width: 24px;
  height: 24px;
`;

export const ItemsCountStyles = styled.span`
  position: absolute;
  font-size: 10px;
  font-weight: bold;
  bottom: 12px;
`;
