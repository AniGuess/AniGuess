import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddOpeningInput = {
  imageUrl: Scalars['String'];
  keywords: Array<Scalars['String']>;
  title: Scalars['String'];
  youtubeUrl: Scalars['String'];
};

export type GetOpeningInput = {
  id: Scalars['Float'];
};

export type GetOpeningsOutput = {
  __typename?: 'GetOpeningsOutput';
  hasMore: Scalars['Boolean'];
  lastId?: Maybe<Scalars['Float']>;
  results: Array<Opening>;
};

export type LoginInput = {
  password: Scalars['String'];
  username: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addOpening: Opening;
  deleteOpening?: Maybe<Opening>;
  login?: Maybe<User>;
  logout?: Maybe<Scalars['Boolean']>;
  updateOpening?: Maybe<Opening>;
};

export type MutationAddOpeningArgs = {
  data: AddOpeningInput;
};

export type MutationDeleteOpeningArgs = {
  data: GetOpeningInput;
};

export type MutationLoginArgs = {
  data: LoginInput;
};

export type MutationUpdateOpeningArgs = {
  data: UpdateOpeningInput;
};

export type Opening = {
  __typename?: 'Opening';
  id: Scalars['ID'];
  imageUrl: Scalars['String'];
  keywords: Array<Scalars['String']>;
  title: Scalars['String'];
  youtubeUrl: Scalars['String'];
};

export type PaginationInput = {
  cursor?: InputMaybe<Scalars['Float']>;
  limit?: InputMaybe<Scalars['Float']>;
};

export type Query = {
  __typename?: 'Query';
  getOpening?: Maybe<Opening>;
  getOpenings: GetOpeningsOutput;
  me?: Maybe<User>;
};

export type QueryGetOpeningArgs = {
  data: GetOpeningInput;
};

export type QueryGetOpeningsArgs = {
  data?: InputMaybe<PaginationInput>;
};

export type UpdateOpeningInput = {
  id: Scalars['Float'];
  imageUrl: Scalars['String'];
  keywords: Array<Scalars['String']>;
  title: Scalars['String'];
  youtubeUrl: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['ID'];
  username: Scalars['String'];
};

export type AddOpeningMutationVariables = Exact<{
  data: AddOpeningInput;
}>;

export type AddOpeningMutation = {
  __typename?: 'Mutation';
  addOpening: {
    __typename?: 'Opening';
    id: string;
    title: string;
    keywords: Array<string>;
    imageUrl: string;
    youtubeUrl: string;
  };
};

export type DeleteOpeningMutationVariables = Exact<{
  data: GetOpeningInput;
}>;

export type DeleteOpeningMutation = {
  __typename?: 'Mutation';
  deleteOpening?: {
    __typename?: 'Opening';
    id: string;
    title: string;
    imageUrl: string;
    youtubeUrl: string;
    keywords: Array<string>;
  } | null;
};

export type LoginMutationVariables = Exact<{
  username: Scalars['String'];
  password: Scalars['String'];
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login?: { __typename?: 'User'; id: string } | null;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout?: boolean | null };

export type UpdateOpeningMutationVariables = Exact<{
  data: UpdateOpeningInput;
}>;

export type UpdateOpeningMutation = {
  __typename?: 'Mutation';
  updateOpening?: {
    __typename?: 'Opening';
    id: string;
    title: string;
    imageUrl: string;
    youtubeUrl: string;
    keywords: Array<string>;
  } | null;
};

export type GetOpeningQueryVariables = Exact<{
  data: GetOpeningInput;
}>;

export type GetOpeningQuery = {
  __typename?: 'Query';
  getOpening?: {
    __typename?: 'Opening';
    id: string;
    title: string;
    imageUrl: string;
    youtubeUrl: string;
    keywords: Array<string>;
  } | null;
};

export type GetOpeningsQueryVariables = Exact<{
  data?: InputMaybe<PaginationInput>;
}>;

export type GetOpeningsQuery = {
  __typename?: 'Query';
  getOpenings: {
    __typename?: 'GetOpeningsOutput';
    hasMore: boolean;
    lastId?: number | null;
    results: Array<{
      __typename?: 'Opening';
      id: string;
      title: string;
      imageUrl: string;
      youtubeUrl: string;
      keywords: Array<string>;
    }>;
  };
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: { __typename?: 'User'; id: string; username: string } | null;
};

export const AddOpeningDocument = gql`
  mutation AddOpening($data: AddOpeningInput!) {
    addOpening(data: $data) {
      id
      title
      keywords
      imageUrl
      youtubeUrl
    }
  }
`;
export type AddOpeningMutationFn = Apollo.MutationFunction<
  AddOpeningMutation,
  AddOpeningMutationVariables
>;

/**
 * __useAddOpeningMutation__
 *
 * To run a mutation, you first call `useAddOpeningMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddOpeningMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addOpeningMutation, { data, loading, error }] = useAddOpeningMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useAddOpeningMutation(
  baseOptions?: Apollo.MutationHookOptions<AddOpeningMutation, AddOpeningMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<AddOpeningMutation, AddOpeningMutationVariables>(
    AddOpeningDocument,
    options
  );
}
export type AddOpeningMutationHookResult = ReturnType<typeof useAddOpeningMutation>;
export type AddOpeningMutationResult = Apollo.MutationResult<AddOpeningMutation>;
export type AddOpeningMutationOptions = Apollo.BaseMutationOptions<
  AddOpeningMutation,
  AddOpeningMutationVariables
>;
export const DeleteOpeningDocument = gql`
  mutation DeleteOpening($data: GetOpeningInput!) {
    deleteOpening(data: $data) {
      id
      title
      imageUrl
      youtubeUrl
      keywords
    }
  }
`;
export type DeleteOpeningMutationFn = Apollo.MutationFunction<
  DeleteOpeningMutation,
  DeleteOpeningMutationVariables
>;

/**
 * __useDeleteOpeningMutation__
 *
 * To run a mutation, you first call `useDeleteOpeningMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteOpeningMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteOpeningMutation, { data, loading, error }] = useDeleteOpeningMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useDeleteOpeningMutation(
  baseOptions?: Apollo.MutationHookOptions<DeleteOpeningMutation, DeleteOpeningMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<DeleteOpeningMutation, DeleteOpeningMutationVariables>(
    DeleteOpeningDocument,
    options
  );
}
export type DeleteOpeningMutationHookResult = ReturnType<typeof useDeleteOpeningMutation>;
export type DeleteOpeningMutationResult = Apollo.MutationResult<DeleteOpeningMutation>;
export type DeleteOpeningMutationOptions = Apollo.BaseMutationOptions<
  DeleteOpeningMutation,
  DeleteOpeningMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($username: String!, $password: String!) {
    login(data: { username: $username, password: $password }) {
      id
    }
  }
`;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      username: // value for 'username'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, options);
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const UpdateOpeningDocument = gql`
  mutation UpdateOpening($data: UpdateOpeningInput!) {
    updateOpening(data: $data) {
      id
      title
      imageUrl
      youtubeUrl
      keywords
    }
  }
`;
export type UpdateOpeningMutationFn = Apollo.MutationFunction<
  UpdateOpeningMutation,
  UpdateOpeningMutationVariables
>;

/**
 * __useUpdateOpeningMutation__
 *
 * To run a mutation, you first call `useUpdateOpeningMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateOpeningMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateOpeningMutation, { data, loading, error }] = useUpdateOpeningMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateOpeningMutation(
  baseOptions?: Apollo.MutationHookOptions<UpdateOpeningMutation, UpdateOpeningMutationVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<UpdateOpeningMutation, UpdateOpeningMutationVariables>(
    UpdateOpeningDocument,
    options
  );
}
export type UpdateOpeningMutationHookResult = ReturnType<typeof useUpdateOpeningMutation>;
export type UpdateOpeningMutationResult = Apollo.MutationResult<UpdateOpeningMutation>;
export type UpdateOpeningMutationOptions = Apollo.BaseMutationOptions<
  UpdateOpeningMutation,
  UpdateOpeningMutationVariables
>;
export const GetOpeningDocument = gql`
  query GetOpening($data: GetOpeningInput!) {
    getOpening(data: $data) {
      id
      title
      imageUrl
      youtubeUrl
      keywords
    }
  }
`;

/**
 * __useGetOpeningQuery__
 *
 * To run a query within a React component, call `useGetOpeningQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpeningQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpeningQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetOpeningQuery(
  baseOptions: Apollo.QueryHookOptions<GetOpeningQuery, GetOpeningQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOpeningQuery, GetOpeningQueryVariables>(GetOpeningDocument, options);
}
export function useGetOpeningLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOpeningQuery, GetOpeningQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetOpeningQuery, GetOpeningQueryVariables>(
    GetOpeningDocument,
    options
  );
}
export type GetOpeningQueryHookResult = ReturnType<typeof useGetOpeningQuery>;
export type GetOpeningLazyQueryHookResult = ReturnType<typeof useGetOpeningLazyQuery>;
export type GetOpeningQueryResult = Apollo.QueryResult<GetOpeningQuery, GetOpeningQueryVariables>;
export const GetOpeningsDocument = gql`
  query GetOpenings($data: PaginationInput) {
    getOpenings(data: $data) {
      hasMore
      lastId
      results {
        id
        title
        imageUrl
        youtubeUrl
        keywords
      }
    }
  }
`;

/**
 * __useGetOpeningsQuery__
 *
 * To run a query within a React component, call `useGetOpeningsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOpeningsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOpeningsQuery({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useGetOpeningsQuery(
  baseOptions?: Apollo.QueryHookOptions<GetOpeningsQuery, GetOpeningsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<GetOpeningsQuery, GetOpeningsQueryVariables>(GetOpeningsDocument, options);
}
export function useGetOpeningsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<GetOpeningsQuery, GetOpeningsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<GetOpeningsQuery, GetOpeningsQueryVariables>(
    GetOpeningsDocument,
    options
  );
}
export type GetOpeningsQueryHookResult = ReturnType<typeof useGetOpeningsQuery>;
export type GetOpeningsLazyQueryHookResult = ReturnType<typeof useGetOpeningsLazyQuery>;
export type GetOpeningsQueryResult = Apollo.QueryResult<
  GetOpeningsQuery,
  GetOpeningsQueryVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      id
      username
    }
  }
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
