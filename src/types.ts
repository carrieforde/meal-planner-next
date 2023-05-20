export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type AddCatalogItemResponse = {
  __typename?: 'AddCatalogItemResponse';
  catalogItem?: Maybe<CatalogItem>;
  code: Scalars['Int'];
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type AddItemToCartResponse = {
  __typename?: 'AddItemToCartResponse';
  code: Scalars['Int'];
  item?: Maybe<ListItem>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type AddItemToListResponse = {
  __typename?: 'AddItemToListResponse';
  code: Scalars['Int'];
  item?: Maybe<RawListItem>;
  message: Scalars['String'];
  success: Scalars['Boolean'];
};

export type AddListItem = {
  itemId: Scalars['ID'];
  quantityNeeded: Scalars['Int'];
  unit?: InputMaybe<Scalars['String']>;
};

export type CatalogInputItem = {
  category: Scalars['String'];
  defaultUnit?: InputMaybe<Scalars['String']>;
  name: Scalars['String'];
};

export type CatalogItem = {
  __typename?: 'CatalogItem';
  category: Scalars['String'];
  defaultUnit?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  name: Scalars['String'];
};

export type List = {
  __typename?: 'List';
  createdAt: Scalars['String'];
  items: Array<ListItem>;
  updatedAt: Scalars['String'];
};

export type ListItem = {
  __typename?: 'ListItem';
  catalogId: Scalars['ID'];
  category: Scalars['String'];
  defaultUnit?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  inCart?: Maybe<Scalars['Boolean']>;
  name: Scalars['String'];
  quantityNeeded: Scalars['Int'];
  unit?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCatalogItem: AddCatalogItemResponse;
  addItemToCart: AddItemToCartResponse;
  addItemToList?: Maybe<AddItemToListResponse>;
};


export type MutationAddCatalogItemArgs = {
  input: CatalogInputItem;
};


export type MutationAddItemToCartArgs = {
  itemId: Scalars['String'];
};


export type MutationAddItemToListArgs = {
  input: AddListItem;
};

export type Query = {
  __typename?: 'Query';
  /** Get catalog items */
  catalog: Array<CatalogItem>;
  /** Get a list of shopping items */
  list: List;
};

export type RawListItem = {
  __typename?: 'RawListItem';
  inCart?: Maybe<Scalars['Boolean']>;
  itemId: Scalars['ID'];
  quantityNeeded: Scalars['Int'];
  unit?: Maybe<Scalars['String']>;
};
