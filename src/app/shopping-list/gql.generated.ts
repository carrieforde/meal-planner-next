import * as Types from '../../../../../../../src/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetShoppingListQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetShoppingListQuery = { __typename?: 'Query', list: { __typename?: 'List', items: Array<{ __typename?: 'ListItem', id: string, catalogId: string, name: string, category: string, defaultUnit?: string | null, quantityNeeded: number, unit?: string | null, inCart?: boolean | null }> } };

export type AddItemToCartMutationVariables = Types.Exact<{
  itemId: Types.Scalars['String'];
}>;


export type AddItemToCartMutation = { __typename?: 'Mutation', addItemToCart: { __typename?: 'AddItemToCartResponse', success: boolean, message: string, item?: { __typename?: 'ListItem', id: string, inCart?: boolean | null } | null } };


export const GetShoppingListDocument = gql`
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

/**
 * __useGetShoppingListQuery__
 *
 * To run a query within a React component, call `useGetShoppingListQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetShoppingListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetShoppingListQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetShoppingListQuery(baseOptions?: Apollo.QueryHookOptions<GetShoppingListQuery, GetShoppingListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetShoppingListQuery, GetShoppingListQueryVariables>(GetShoppingListDocument, options);
      }
export function useGetShoppingListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetShoppingListQuery, GetShoppingListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetShoppingListQuery, GetShoppingListQueryVariables>(GetShoppingListDocument, options);
        }
export type GetShoppingListQueryHookResult = ReturnType<typeof useGetShoppingListQuery>;
export type GetShoppingListLazyQueryHookResult = ReturnType<typeof useGetShoppingListLazyQuery>;
export type GetShoppingListQueryResult = Apollo.QueryResult<GetShoppingListQuery, GetShoppingListQueryVariables>;
export const AddItemToCartDocument = gql`
    mutation AddItemToCart($itemId: String!) {
  addItemToCart(itemId: $itemId) {
    item {
      id
      inCart
    }
    success
    message
  }
}
    `;
export type AddItemToCartMutationFn = Apollo.MutationFunction<AddItemToCartMutation, AddItemToCartMutationVariables>;

/**
 * __useAddItemToCartMutation__
 *
 * To run a mutation, you first call `useAddItemToCartMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemToCartMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemToCartMutation, { data, loading, error }] = useAddItemToCartMutation({
 *   variables: {
 *      itemId: // value for 'itemId'
 *   },
 * });
 */
export function useAddItemToCartMutation(baseOptions?: Apollo.MutationHookOptions<AddItemToCartMutation, AddItemToCartMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemToCartMutation, AddItemToCartMutationVariables>(AddItemToCartDocument, options);
      }
export type AddItemToCartMutationHookResult = ReturnType<typeof useAddItemToCartMutation>;
export type AddItemToCartMutationResult = Apollo.MutationResult<AddItemToCartMutation>;
export type AddItemToCartMutationOptions = Apollo.BaseMutationOptions<AddItemToCartMutation, AddItemToCartMutationVariables>;