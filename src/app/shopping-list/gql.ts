import { gql } from "@apollo/client";

export const GET_SHOPPING_LIST = gql`
  query GetShoppingList {
    list {
      items {
        id
        catalogId
        name
        category
        defaultUnit
        quantityNeeded
        unit
        inCart
      }
    }
  }
`;

export const ADD_ITEM_TO_CART = gql`
  mutation AddItemToCart($itemId: String!) {
    addItemToCart(itemId: $itemId) {
      message
    }
  }
`;
