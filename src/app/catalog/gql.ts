import { gql } from "@apollo/client";

export const GET_CATALOG = gql`
  query GetCatalog {
    catalog {
      id
      name
      category
      defaultUnit
    }
  }
`;

export const ADD_ITEM_TO_LIST = gql`
  mutation AddItemToShoppingList($input: AddListItem!) {
    addItemToList(input: $input) {
      code
      success
      message
      item {
        itemId
        quantityNeeded
        unit
        inCart
      }
    }
  }
`;
