import * as Types from '../../../../../../../src/types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type GetCatalogQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type GetCatalogQuery = { __typename?: 'Query', catalog: Array<{ __typename?: 'CatalogItem', id: string, name: string, category: string, defaultUnit?: string | null }> };

export type AddItemToShoppingListMutationVariables = Types.Exact<{
  input: Types.AddListItem;
}>;


export type AddItemToShoppingListMutation = { __typename?: 'Mutation', addItemToList?: { __typename?: 'AddItemToListResponse', code: number, success: boolean, message: string, item?: { __typename?: 'RawListItem', itemId: string, quantityNeeded: number, unit?: string | null, inCart?: boolean | null } | null } | null };


export const GetCatalogDocument = gql`
    query GetCatalog {
  catalog {
    id
    name
    category
    defaultUnit
  }
}
    `;

/**
 * __useGetCatalogQuery__
 *
 * To run a query within a React component, call `useGetCatalogQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCatalogQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCatalogQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCatalogQuery(baseOptions?: Apollo.QueryHookOptions<GetCatalogQuery, GetCatalogQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCatalogQuery, GetCatalogQueryVariables>(GetCatalogDocument, options);
      }
export function useGetCatalogLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCatalogQuery, GetCatalogQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCatalogQuery, GetCatalogQueryVariables>(GetCatalogDocument, options);
        }
export type GetCatalogQueryHookResult = ReturnType<typeof useGetCatalogQuery>;
export type GetCatalogLazyQueryHookResult = ReturnType<typeof useGetCatalogLazyQuery>;
export type GetCatalogQueryResult = Apollo.QueryResult<GetCatalogQuery, GetCatalogQueryVariables>;
export const AddItemToShoppingListDocument = gql`
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
export type AddItemToShoppingListMutationFn = Apollo.MutationFunction<AddItemToShoppingListMutation, AddItemToShoppingListMutationVariables>;

/**
 * __useAddItemToShoppingListMutation__
 *
 * To run a mutation, you first call `useAddItemToShoppingListMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddItemToShoppingListMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addItemToShoppingListMutation, { data, loading, error }] = useAddItemToShoppingListMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddItemToShoppingListMutation(baseOptions?: Apollo.MutationHookOptions<AddItemToShoppingListMutation, AddItemToShoppingListMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddItemToShoppingListMutation, AddItemToShoppingListMutationVariables>(AddItemToShoppingListDocument, options);
      }
export type AddItemToShoppingListMutationHookResult = ReturnType<typeof useAddItemToShoppingListMutation>;
export type AddItemToShoppingListMutationResult = Apollo.MutationResult<AddItemToShoppingListMutation>;
export type AddItemToShoppingListMutationOptions = Apollo.BaseMutationOptions<AddItemToShoppingListMutation, AddItemToShoppingListMutationVariables>;