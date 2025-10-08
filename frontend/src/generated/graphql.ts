import { gql } from "@apollo/client";
import * as ApolloReactCommon from "@apollo/client/react";
import * as ApolloReactHooks from "@apollo/client/react";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends " $fragmentName" | "__typename" ? T[P] : never;
    };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  DateTime: { input: any; output: any };
  JSON: { input: any; output: any };
};

export type Audit = {
  __typename?: "Audit";
  changeSubType?: Maybe<Scalars["String"]["output"]>;
  changes?: Maybe<Scalars["JSON"]["output"]>;
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  createdBy?: Maybe<User>;
  id: Scalars["ID"]["output"];
  recordId?: Maybe<Scalars["String"]["output"]>;
  tableName?: Maybe<Scalars["String"]["output"]>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type AuditCreateInput = {
  changeSubType?: InputMaybe<Scalars["String"]["input"]>;
  changes?: InputMaybe<Scalars["JSON"]["input"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  createdBy?: InputMaybe<UserRelateToOneForCreateInput>;
  recordId?: InputMaybe<Scalars["String"]["input"]>;
  tableName?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type AuditOrderByInput = {
  changeSubType?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  recordId?: InputMaybe<OrderDirection>;
  tableName?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type AuditUpdateArgs = {
  data: AuditUpdateInput;
  where: AuditWhereUniqueInput;
};

export type AuditUpdateInput = {
  changeSubType?: InputMaybe<Scalars["String"]["input"]>;
  changes?: InputMaybe<Scalars["JSON"]["input"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  createdBy?: InputMaybe<UserRelateToOneForUpdateInput>;
  recordId?: InputMaybe<Scalars["String"]["input"]>;
  tableName?: InputMaybe<Scalars["String"]["input"]>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type AuditWhereInput = {
  AND?: InputMaybe<Array<AuditWhereInput>>;
  NOT?: InputMaybe<Array<AuditWhereInput>>;
  OR?: InputMaybe<Array<AuditWhereInput>>;
  changeSubType?: InputMaybe<StringNullableFilter>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  createdBy?: InputMaybe<UserWhereInput>;
  id?: InputMaybe<IdFilter>;
  recordId?: InputMaybe<StringFilter>;
  tableName?: InputMaybe<StringFilter>;
  type?: InputMaybe<StringFilter>;
};

export type AuditWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars["Boolean"]["input"]>;
  not?: InputMaybe<BooleanFilter>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  isAdmin?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars["DateTime"]["input"]>;
  gt?: InputMaybe<Scalars["DateTime"]["input"]>;
  gte?: InputMaybe<Scalars["DateTime"]["input"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
  lt?: InputMaybe<Scalars["DateTime"]["input"]>;
  lte?: InputMaybe<Scalars["DateTime"]["input"]>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]["input"]>>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars["ID"]["input"]>;
  gt?: InputMaybe<Scalars["ID"]["input"]>;
  gte?: InputMaybe<Scalars["ID"]["input"]>;
  in?: InputMaybe<Array<Scalars["ID"]["input"]>>;
  lt?: InputMaybe<Scalars["ID"]["input"]>;
  lte?: InputMaybe<Scalars["ID"]["input"]>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars["ID"]["input"]>>;
};

export type KeystoneAdminMeta = {
  __typename?: "KeystoneAdminMeta";
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};

export type KeystoneAdminMetaListArgs = {
  key: Scalars["String"]["input"];
};

export type KeystoneAdminUiFieldGroupMeta = {
  __typename?: "KeystoneAdminUIFieldGroupMeta";
  description?: Maybe<Scalars["String"]["output"]>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  label: Scalars["String"]["output"];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: "KeystoneAdminUIFieldMeta";
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars["Int"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  fieldMeta?: Maybe<Scalars["JSON"]["output"]>;
  isFilterable: Scalars["Boolean"]["output"];
  isNonNull?: Maybe<Array<KeystoneAdminUiFieldMetaIsNonNull>>;
  isOrderable: Scalars["Boolean"]["output"];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars["String"]["output"];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars["String"]["output"];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars["Int"]["output"];
};

export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: "KeystoneAdminUIFieldMetaCreateView";
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = "edit",
  Hidden = "hidden",
}

export enum KeystoneAdminUiFieldMetaIsNonNull {
  Create = "create",
  Read = "read",
  Update = "update",
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: "KeystoneAdminUIFieldMetaItemView";
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
  fieldPosition?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldPosition>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = "edit",
  Hidden = "hidden",
  Read = "read",
}

export enum KeystoneAdminUiFieldMetaItemViewFieldPosition {
  Form = "form",
  Sidebar = "sidebar",
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: "KeystoneAdminUIFieldMetaListView";
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = "hidden",
  Read = "read",
}

export type KeystoneAdminUiGraphQl = {
  __typename?: "KeystoneAdminUIGraphQL";
  names: KeystoneAdminUiGraphQlNames;
};

export type KeystoneAdminUiGraphQlNames = {
  __typename?: "KeystoneAdminUIGraphQLNames";
  createInputName: Scalars["String"]["output"];
  createManyMutationName: Scalars["String"]["output"];
  createMutationName: Scalars["String"]["output"];
  deleteManyMutationName: Scalars["String"]["output"];
  deleteMutationName: Scalars["String"]["output"];
  itemQueryName: Scalars["String"]["output"];
  listOrderName: Scalars["String"]["output"];
  listQueryCountName: Scalars["String"]["output"];
  listQueryName: Scalars["String"]["output"];
  outputTypeName: Scalars["String"]["output"];
  relateToManyForCreateInputName: Scalars["String"]["output"];
  relateToManyForUpdateInputName: Scalars["String"]["output"];
  relateToOneForCreateInputName: Scalars["String"]["output"];
  relateToOneForUpdateInputName: Scalars["String"]["output"];
  updateInputName: Scalars["String"]["output"];
  updateManyInputName: Scalars["String"]["output"];
  updateManyMutationName: Scalars["String"]["output"];
  updateMutationName: Scalars["String"]["output"];
  whereInputName: Scalars["String"]["output"];
  whereUniqueInputName: Scalars["String"]["output"];
};

export type KeystoneAdminUiListMeta = {
  __typename?: "KeystoneAdminUIListMeta";
  description?: Maybe<Scalars["String"]["output"]>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  graphql: KeystoneAdminUiGraphQl;
  groups: Array<KeystoneAdminUiFieldGroupMeta>;
  hideCreate: Scalars["Boolean"]["output"];
  hideDelete: Scalars["Boolean"]["output"];
  initialColumns: Array<Scalars["String"]["output"]>;
  initialSearchFields: Array<Scalars["String"]["output"]>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars["Boolean"]["output"];
  isSingleton: Scalars["Boolean"]["output"];
  itemQueryName: Scalars["String"]["output"];
  key: Scalars["String"]["output"];
  label: Scalars["String"]["output"];
  labelField: Scalars["String"]["output"];
  listQueryName: Scalars["String"]["output"];
  pageSize: Scalars["Int"]["output"];
  path: Scalars["String"]["output"];
  plural: Scalars["String"]["output"];
  singular: Scalars["String"]["output"];
};

export type KeystoneAdminUiSort = {
  __typename?: "KeystoneAdminUISort";
  direction: KeystoneAdminUiSortDirection;
  field: Scalars["String"]["output"];
};

export enum KeystoneAdminUiSortDirection {
  Asc = "ASC",
  Desc = "DESC",
}

export type KeystoneMeta = {
  __typename?: "KeystoneMeta";
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: "Mutation";
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createAudit?: Maybe<Audit>;
  createAudits?: Maybe<Array<Maybe<Audit>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createUpload?: Maybe<Upload>;
  createUploadLocation?: Maybe<UploadLocation>;
  createUploadLocationGoogleDrive?: Maybe<UploadLocationGoogleDrive>;
  createUploadLocationGoogleDrives?: Maybe<
    Array<Maybe<UploadLocationGoogleDrive>>
  >;
  createUploadLocationLocal?: Maybe<UploadLocationLocal>;
  createUploadLocationLocals?: Maybe<Array<Maybe<UploadLocationLocal>>>;
  createUploadLocationS3?: Maybe<UploadLocationS3>;
  createUploadLocationS3s?: Maybe<Array<Maybe<UploadLocationS3>>>;
  createUploadLocations?: Maybe<Array<Maybe<UploadLocation>>>;
  createUploadProject?: Maybe<UploadProject>;
  createUploadProjects?: Maybe<Array<Maybe<UploadProject>>>;
  createUploads?: Maybe<Array<Maybe<Upload>>>;
  createUser?: Maybe<User>;
  createUserToken?: Maybe<UserToken>;
  createUserTokens?: Maybe<Array<Maybe<UserToken>>>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  createVideo?: Maybe<Video>;
  createVideos?: Maybe<Array<Maybe<Video>>>;
  deleteAudit?: Maybe<Audit>;
  deleteAudits?: Maybe<Array<Maybe<Audit>>>;
  deleteUpload?: Maybe<Upload>;
  deleteUploadLocation?: Maybe<UploadLocation>;
  deleteUploadLocationGoogleDrive?: Maybe<UploadLocationGoogleDrive>;
  deleteUploadLocationGoogleDrives?: Maybe<
    Array<Maybe<UploadLocationGoogleDrive>>
  >;
  deleteUploadLocationLocal?: Maybe<UploadLocationLocal>;
  deleteUploadLocationLocals?: Maybe<Array<Maybe<UploadLocationLocal>>>;
  deleteUploadLocationS3?: Maybe<UploadLocationS3>;
  deleteUploadLocationS3s?: Maybe<Array<Maybe<UploadLocationS3>>>;
  deleteUploadLocations?: Maybe<Array<Maybe<UploadLocation>>>;
  deleteUploadProject?: Maybe<UploadProject>;
  deleteUploadProjects?: Maybe<Array<Maybe<UploadProject>>>;
  deleteUploads?: Maybe<Array<Maybe<Upload>>>;
  deleteUser?: Maybe<User>;
  deleteUserToken?: Maybe<UserToken>;
  deleteUserTokens?: Maybe<Array<Maybe<UserToken>>>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  deleteVideo?: Maybe<Video>;
  deleteVideos?: Maybe<Array<Maybe<Video>>>;
  endSession: Scalars["Boolean"]["output"];
  updateAudit?: Maybe<Audit>;
  updateAudits?: Maybe<Array<Maybe<Audit>>>;
  updateUpload?: Maybe<Upload>;
  updateUploadLocation?: Maybe<UploadLocation>;
  updateUploadLocationGoogleDrive?: Maybe<UploadLocationGoogleDrive>;
  updateUploadLocationGoogleDrives?: Maybe<
    Array<Maybe<UploadLocationGoogleDrive>>
  >;
  updateUploadLocationLocal?: Maybe<UploadLocationLocal>;
  updateUploadLocationLocals?: Maybe<Array<Maybe<UploadLocationLocal>>>;
  updateUploadLocationS3?: Maybe<UploadLocationS3>;
  updateUploadLocationS3s?: Maybe<Array<Maybe<UploadLocationS3>>>;
  updateUploadLocations?: Maybe<Array<Maybe<UploadLocation>>>;
  updateUploadProject?: Maybe<UploadProject>;
  updateUploadProjects?: Maybe<Array<Maybe<UploadProject>>>;
  updateUploads?: Maybe<Array<Maybe<Upload>>>;
  updateUser?: Maybe<User>;
  updateUserToken?: Maybe<UserToken>;
  updateUserTokens?: Maybe<Array<Maybe<UserToken>>>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
  updateVideo?: Maybe<Video>;
  updateVideos?: Maybe<Array<Maybe<Video>>>;
};

export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
};

export type MutationCreateAuditArgs = {
  data: AuditCreateInput;
};

export type MutationCreateAuditsArgs = {
  data: Array<AuditCreateInput>;
};

export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};

export type MutationCreateUploadArgs = {
  data: UploadCreateInput;
};

export type MutationCreateUploadLocationArgs = {
  data: UploadLocationCreateInput;
};

export type MutationCreateUploadLocationGoogleDriveArgs = {
  data: UploadLocationGoogleDriveCreateInput;
};

export type MutationCreateUploadLocationGoogleDrivesArgs = {
  data: Array<UploadLocationGoogleDriveCreateInput>;
};

export type MutationCreateUploadLocationLocalArgs = {
  data: UploadLocationLocalCreateInput;
};

export type MutationCreateUploadLocationLocalsArgs = {
  data: Array<UploadLocationLocalCreateInput>;
};

export type MutationCreateUploadLocationS3Args = {
  data: UploadLocationS3CreateInput;
};

export type MutationCreateUploadLocationS3sArgs = {
  data: Array<UploadLocationS3CreateInput>;
};

export type MutationCreateUploadLocationsArgs = {
  data: Array<UploadLocationCreateInput>;
};

export type MutationCreateUploadProjectArgs = {
  data: UploadProjectCreateInput;
};

export type MutationCreateUploadProjectsArgs = {
  data: Array<UploadProjectCreateInput>;
};

export type MutationCreateUploadsArgs = {
  data: Array<UploadCreateInput>;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationCreateUserTokenArgs = {
  data: UserTokenCreateInput;
};

export type MutationCreateUserTokensArgs = {
  data: Array<UserTokenCreateInput>;
};

export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};

export type MutationCreateVideoArgs = {
  data: VideoCreateInput;
};

export type MutationCreateVideosArgs = {
  data: Array<VideoCreateInput>;
};

export type MutationDeleteAuditArgs = {
  where: AuditWhereUniqueInput;
};

export type MutationDeleteAuditsArgs = {
  where: Array<AuditWhereUniqueInput>;
};

export type MutationDeleteUploadArgs = {
  where: UploadWhereUniqueInput;
};

export type MutationDeleteUploadLocationArgs = {
  where: UploadLocationWhereUniqueInput;
};

export type MutationDeleteUploadLocationGoogleDriveArgs = {
  where: UploadLocationGoogleDriveWhereUniqueInput;
};

export type MutationDeleteUploadLocationGoogleDrivesArgs = {
  where: Array<UploadLocationGoogleDriveWhereUniqueInput>;
};

export type MutationDeleteUploadLocationLocalArgs = {
  where: UploadLocationLocalWhereUniqueInput;
};

export type MutationDeleteUploadLocationLocalsArgs = {
  where: Array<UploadLocationLocalWhereUniqueInput>;
};

export type MutationDeleteUploadLocationS3Args = {
  where: UploadLocationS3WhereUniqueInput;
};

export type MutationDeleteUploadLocationS3sArgs = {
  where: Array<UploadLocationS3WhereUniqueInput>;
};

export type MutationDeleteUploadLocationsArgs = {
  where: Array<UploadLocationWhereUniqueInput>;
};

export type MutationDeleteUploadProjectArgs = {
  where: UploadProjectWhereUniqueInput;
};

export type MutationDeleteUploadProjectsArgs = {
  where: Array<UploadProjectWhereUniqueInput>;
};

export type MutationDeleteUploadsArgs = {
  where: Array<UploadWhereUniqueInput>;
};

export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};

export type MutationDeleteUserTokenArgs = {
  where: UserTokenWhereUniqueInput;
};

export type MutationDeleteUserTokensArgs = {
  where: Array<UserTokenWhereUniqueInput>;
};

export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};

export type MutationDeleteVideoArgs = {
  where: VideoWhereUniqueInput;
};

export type MutationDeleteVideosArgs = {
  where: Array<VideoWhereUniqueInput>;
};

export type MutationUpdateAuditArgs = {
  data: AuditUpdateInput;
  where: AuditWhereUniqueInput;
};

export type MutationUpdateAuditsArgs = {
  data: Array<AuditUpdateArgs>;
};

export type MutationUpdateUploadArgs = {
  data: UploadUpdateInput;
  where: UploadWhereUniqueInput;
};

export type MutationUpdateUploadLocationArgs = {
  data: UploadLocationUpdateInput;
  where: UploadLocationWhereUniqueInput;
};

export type MutationUpdateUploadLocationGoogleDriveArgs = {
  data: UploadLocationGoogleDriveUpdateInput;
  where: UploadLocationGoogleDriveWhereUniqueInput;
};

export type MutationUpdateUploadLocationGoogleDrivesArgs = {
  data: Array<UploadLocationGoogleDriveUpdateArgs>;
};

export type MutationUpdateUploadLocationLocalArgs = {
  data: UploadLocationLocalUpdateInput;
  where: UploadLocationLocalWhereUniqueInput;
};

export type MutationUpdateUploadLocationLocalsArgs = {
  data: Array<UploadLocationLocalUpdateArgs>;
};

export type MutationUpdateUploadLocationS3Args = {
  data: UploadLocationS3UpdateInput;
  where: UploadLocationS3WhereUniqueInput;
};

export type MutationUpdateUploadLocationS3sArgs = {
  data: Array<UploadLocationS3UpdateArgs>;
};

export type MutationUpdateUploadLocationsArgs = {
  data: Array<UploadLocationUpdateArgs>;
};

export type MutationUpdateUploadProjectArgs = {
  data: UploadProjectUpdateInput;
  where: UploadProjectWhereUniqueInput;
};

export type MutationUpdateUploadProjectsArgs = {
  data: Array<UploadProjectUpdateArgs>;
};

export type MutationUpdateUploadsArgs = {
  data: Array<UploadUpdateArgs>;
};

export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type MutationUpdateUserTokenArgs = {
  data: UserTokenUpdateInput;
  where: UserTokenWhereUniqueInput;
};

export type MutationUpdateUserTokensArgs = {
  data: Array<UserTokenUpdateArgs>;
};

export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type MutationUpdateVideoArgs = {
  data: VideoUpdateInput;
  where: VideoWhereUniqueInput;
};

export type MutationUpdateVideosArgs = {
  data: Array<VideoUpdateArgs>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export enum OrderDirection {
  Asc = "asc",
  Desc = "desc",
}

export type PasswordState = {
  __typename?: "PasswordState";
  isSet: Scalars["Boolean"]["output"];
};

export type Query = {
  __typename?: "Query";
  audit?: Maybe<Audit>;
  audits?: Maybe<Array<Audit>>;
  auditsCount?: Maybe<Scalars["Int"]["output"]>;
  authenticatedItem?: Maybe<AuthenticatedItem>;
  keystone: KeystoneMeta;
  upload?: Maybe<Upload>;
  uploadLocation?: Maybe<UploadLocation>;
  uploadLocationGoogleDrive?: Maybe<UploadLocationGoogleDrive>;
  uploadLocationGoogleDrives?: Maybe<Array<UploadLocationGoogleDrive>>;
  uploadLocationGoogleDrivesCount?: Maybe<Scalars["Int"]["output"]>;
  uploadLocationLocal?: Maybe<UploadLocationLocal>;
  uploadLocationLocals?: Maybe<Array<UploadLocationLocal>>;
  uploadLocationLocalsCount?: Maybe<Scalars["Int"]["output"]>;
  uploadLocationS3?: Maybe<UploadLocationS3>;
  uploadLocationS3s?: Maybe<Array<UploadLocationS3>>;
  uploadLocationS3sCount?: Maybe<Scalars["Int"]["output"]>;
  uploadLocations?: Maybe<Array<UploadLocation>>;
  uploadLocationsCount?: Maybe<Scalars["Int"]["output"]>;
  uploadProject?: Maybe<UploadProject>;
  uploadProjects?: Maybe<Array<UploadProject>>;
  uploadProjectsCount?: Maybe<Scalars["Int"]["output"]>;
  uploads?: Maybe<Array<Upload>>;
  uploadsCount?: Maybe<Scalars["Int"]["output"]>;
  user?: Maybe<User>;
  userToken?: Maybe<UserToken>;
  userTokens?: Maybe<Array<UserToken>>;
  userTokensCount?: Maybe<Scalars["Int"]["output"]>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars["Int"]["output"]>;
  video?: Maybe<Video>;
  videos?: Maybe<Array<Video>>;
  videosCount?: Maybe<Scalars["Int"]["output"]>;
  youtubeAuthUrl?: Maybe<Scalars["String"]["output"]>;
};

export type QueryAuditArgs = {
  where: AuditWhereUniqueInput;
};

export type QueryAuditsArgs = {
  cursor?: InputMaybe<AuditWhereUniqueInput>;
  orderBy?: Array<AuditOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: AuditWhereInput;
};

export type QueryAuditsCountArgs = {
  where?: AuditWhereInput;
};

export type QueryUploadArgs = {
  where: UploadWhereUniqueInput;
};

export type QueryUploadLocationArgs = {
  where: UploadLocationWhereUniqueInput;
};

export type QueryUploadLocationGoogleDriveArgs = {
  where: UploadLocationGoogleDriveWhereUniqueInput;
};

export type QueryUploadLocationGoogleDrivesArgs = {
  cursor?: InputMaybe<UploadLocationGoogleDriveWhereUniqueInput>;
  orderBy?: Array<UploadLocationGoogleDriveOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UploadLocationGoogleDriveWhereInput;
};

export type QueryUploadLocationGoogleDrivesCountArgs = {
  where?: UploadLocationGoogleDriveWhereInput;
};

export type QueryUploadLocationLocalArgs = {
  where: UploadLocationLocalWhereUniqueInput;
};

export type QueryUploadLocationLocalsArgs = {
  cursor?: InputMaybe<UploadLocationLocalWhereUniqueInput>;
  orderBy?: Array<UploadLocationLocalOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UploadLocationLocalWhereInput;
};

export type QueryUploadLocationLocalsCountArgs = {
  where?: UploadLocationLocalWhereInput;
};

export type QueryUploadLocationS3Args = {
  where: UploadLocationS3WhereUniqueInput;
};

export type QueryUploadLocationS3sArgs = {
  cursor?: InputMaybe<UploadLocationS3WhereUniqueInput>;
  orderBy?: Array<UploadLocationS3OrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UploadLocationS3WhereInput;
};

export type QueryUploadLocationS3sCountArgs = {
  where?: UploadLocationS3WhereInput;
};

export type QueryUploadLocationsArgs = {
  cursor?: InputMaybe<UploadLocationWhereUniqueInput>;
  orderBy?: Array<UploadLocationOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UploadLocationWhereInput;
};

export type QueryUploadLocationsCountArgs = {
  where?: UploadLocationWhereInput;
};

export type QueryUploadProjectArgs = {
  where: UploadProjectWhereUniqueInput;
};

export type QueryUploadProjectsArgs = {
  cursor?: InputMaybe<UploadProjectWhereUniqueInput>;
  orderBy?: Array<UploadProjectOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UploadProjectWhereInput;
};

export type QueryUploadProjectsCountArgs = {
  where?: UploadProjectWhereInput;
};

export type QueryUploadsArgs = {
  cursor?: InputMaybe<UploadWhereUniqueInput>;
  orderBy?: Array<UploadOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UploadWhereInput;
};

export type QueryUploadsCountArgs = {
  where?: UploadWhereInput;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUserTokenArgs = {
  where: UserTokenWhereUniqueInput;
};

export type QueryUserTokensArgs = {
  cursor?: InputMaybe<UserTokenWhereUniqueInput>;
  orderBy?: Array<UserTokenOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UserTokenWhereInput;
};

export type QueryUserTokensCountArgs = {
  where?: UserTokenWhereInput;
};

export type QueryUsersArgs = {
  cursor?: InputMaybe<UserWhereUniqueInput>;
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UserWhereInput;
};

export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export type QueryVideoArgs = {
  where: VideoWhereUniqueInput;
};

export type QueryVideosArgs = {
  cursor?: InputMaybe<VideoWhereUniqueInput>;
  orderBy?: Array<VideoOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: VideoWhereInput;
};

export type QueryVideosCountArgs = {
  where?: VideoWhereInput;
};

export enum QueryMode {
  Default = "default",
  Insensitive = "insensitive",
}

export type StringFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars["String"]["input"]>;
  endsWith?: InputMaybe<Scalars["String"]["input"]>;
  equals?: InputMaybe<Scalars["String"]["input"]>;
  gt?: InputMaybe<Scalars["String"]["input"]>;
  gte?: InputMaybe<Scalars["String"]["input"]>;
  in?: InputMaybe<Array<Scalars["String"]["input"]>>;
  lt?: InputMaybe<Scalars["String"]["input"]>;
  lte?: InputMaybe<Scalars["String"]["input"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<StringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]["input"]>>;
  startsWith?: InputMaybe<Scalars["String"]["input"]>;
};

export type Upload = {
  __typename?: "Upload";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  project?: Maybe<UploadProject>;
  scheduledFor?: Maybe<Scalars["DateTime"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  uploadStatus?: Maybe<Scalars["String"]["output"]>;
  uploadTo?: Maybe<Scalars["String"]["output"]>;
};

export type UploadCreateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  project?: InputMaybe<UploadProjectRelateToOneForCreateInput>;
  scheduledFor?: InputMaybe<Scalars["DateTime"]["input"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  uploadStatus?: InputMaybe<Scalars["String"]["input"]>;
  uploadTo?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadLocation = {
  __typename?: "UploadLocation";
  googleDrive?: Maybe<UploadLocationGoogleDrive>;
  id: Scalars["ID"]["output"];
  localLink?: Maybe<UploadLocationLocal>;
  project?: Maybe<UploadProject>;
  s3Link?: Maybe<UploadLocationS3>;
  type?: Maybe<Scalars["String"]["output"]>;
};

export type UploadLocationCreateInput = {
  googleDrive?: InputMaybe<UploadLocationGoogleDriveRelateToOneForCreateInput>;
  localLink?: InputMaybe<UploadLocationLocalRelateToOneForCreateInput>;
  project?: InputMaybe<UploadProjectRelateToOneForCreateInput>;
  s3Link?: InputMaybe<UploadLocationS3RelateToOneForCreateInput>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadLocationGoogleDrive = {
  __typename?: "UploadLocationGoogleDrive";
  driveId?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  location?: Maybe<UploadLocation>;
  name?: Maybe<Scalars["String"]["output"]>;
};

export type UploadLocationGoogleDriveCreateInput = {
  driveId?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<UploadLocationRelateToOneForCreateInput>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadLocationGoogleDriveOrderByInput = {
  driveId?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type UploadLocationGoogleDriveRelateToOneForCreateInput = {
  connect?: InputMaybe<UploadLocationGoogleDriveWhereUniqueInput>;
  create?: InputMaybe<UploadLocationGoogleDriveCreateInput>;
};

export type UploadLocationGoogleDriveRelateToOneForUpdateInput = {
  connect?: InputMaybe<UploadLocationGoogleDriveWhereUniqueInput>;
  create?: InputMaybe<UploadLocationGoogleDriveCreateInput>;
  disconnect?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UploadLocationGoogleDriveUpdateArgs = {
  data: UploadLocationGoogleDriveUpdateInput;
  where: UploadLocationGoogleDriveWhereUniqueInput;
};

export type UploadLocationGoogleDriveUpdateInput = {
  driveId?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<UploadLocationRelateToOneForUpdateInput>;
  name?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadLocationGoogleDriveWhereInput = {
  AND?: InputMaybe<Array<UploadLocationGoogleDriveWhereInput>>;
  NOT?: InputMaybe<Array<UploadLocationGoogleDriveWhereInput>>;
  OR?: InputMaybe<Array<UploadLocationGoogleDriveWhereInput>>;
  driveId?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  location?: InputMaybe<UploadLocationWhereInput>;
  name?: InputMaybe<StringFilter>;
};

export type UploadLocationGoogleDriveWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UploadLocationLocal = {
  __typename?: "UploadLocationLocal";
  id: Scalars["ID"]["output"];
  location?: Maybe<UploadLocation>;
  path?: Maybe<Scalars["String"]["output"]>;
};

export type UploadLocationLocalCreateInput = {
  location?: InputMaybe<UploadLocationRelateToOneForCreateInput>;
  path?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadLocationLocalOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  path?: InputMaybe<OrderDirection>;
};

export type UploadLocationLocalRelateToOneForCreateInput = {
  connect?: InputMaybe<UploadLocationLocalWhereUniqueInput>;
  create?: InputMaybe<UploadLocationLocalCreateInput>;
};

export type UploadLocationLocalRelateToOneForUpdateInput = {
  connect?: InputMaybe<UploadLocationLocalWhereUniqueInput>;
  create?: InputMaybe<UploadLocationLocalCreateInput>;
  disconnect?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UploadLocationLocalUpdateArgs = {
  data: UploadLocationLocalUpdateInput;
  where: UploadLocationLocalWhereUniqueInput;
};

export type UploadLocationLocalUpdateInput = {
  location?: InputMaybe<UploadLocationRelateToOneForUpdateInput>;
  path?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadLocationLocalWhereInput = {
  AND?: InputMaybe<Array<UploadLocationLocalWhereInput>>;
  NOT?: InputMaybe<Array<UploadLocationLocalWhereInput>>;
  OR?: InputMaybe<Array<UploadLocationLocalWhereInput>>;
  id?: InputMaybe<IdFilter>;
  location?: InputMaybe<UploadLocationWhereInput>;
  path?: InputMaybe<StringFilter>;
};

export type UploadLocationLocalWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UploadLocationOrderByInput = {
  id?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
};

export type UploadLocationRelateToOneForCreateInput = {
  connect?: InputMaybe<UploadLocationWhereUniqueInput>;
  create?: InputMaybe<UploadLocationCreateInput>;
};

export type UploadLocationRelateToOneForUpdateInput = {
  connect?: InputMaybe<UploadLocationWhereUniqueInput>;
  create?: InputMaybe<UploadLocationCreateInput>;
  disconnect?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UploadLocationS3 = {
  __typename?: "UploadLocationS3";
  bucket?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  key?: Maybe<Scalars["String"]["output"]>;
  location?: Maybe<UploadLocation>;
};

export type UploadLocationS3CreateInput = {
  bucket?: InputMaybe<Scalars["String"]["input"]>;
  key?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<UploadLocationRelateToOneForCreateInput>;
};

export type UploadLocationS3OrderByInput = {
  bucket?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  key?: InputMaybe<OrderDirection>;
};

export type UploadLocationS3RelateToOneForCreateInput = {
  connect?: InputMaybe<UploadLocationS3WhereUniqueInput>;
  create?: InputMaybe<UploadLocationS3CreateInput>;
};

export type UploadLocationS3RelateToOneForUpdateInput = {
  connect?: InputMaybe<UploadLocationS3WhereUniqueInput>;
  create?: InputMaybe<UploadLocationS3CreateInput>;
  disconnect?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UploadLocationS3UpdateArgs = {
  data: UploadLocationS3UpdateInput;
  where: UploadLocationS3WhereUniqueInput;
};

export type UploadLocationS3UpdateInput = {
  bucket?: InputMaybe<Scalars["String"]["input"]>;
  key?: InputMaybe<Scalars["String"]["input"]>;
  location?: InputMaybe<UploadLocationRelateToOneForUpdateInput>;
};

export type UploadLocationS3WhereInput = {
  AND?: InputMaybe<Array<UploadLocationS3WhereInput>>;
  NOT?: InputMaybe<Array<UploadLocationS3WhereInput>>;
  OR?: InputMaybe<Array<UploadLocationS3WhereInput>>;
  bucket?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  key?: InputMaybe<StringFilter>;
  location?: InputMaybe<UploadLocationWhereInput>;
};

export type UploadLocationS3WhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UploadLocationUpdateArgs = {
  data: UploadLocationUpdateInput;
  where: UploadLocationWhereUniqueInput;
};

export type UploadLocationUpdateInput = {
  googleDrive?: InputMaybe<UploadLocationGoogleDriveRelateToOneForUpdateInput>;
  localLink?: InputMaybe<UploadLocationLocalRelateToOneForUpdateInput>;
  project?: InputMaybe<UploadProjectRelateToOneForUpdateInput>;
  s3Link?: InputMaybe<UploadLocationS3RelateToOneForUpdateInput>;
  type?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadLocationWhereInput = {
  AND?: InputMaybe<Array<UploadLocationWhereInput>>;
  NOT?: InputMaybe<Array<UploadLocationWhereInput>>;
  OR?: InputMaybe<Array<UploadLocationWhereInput>>;
  googleDrive?: InputMaybe<UploadLocationGoogleDriveWhereInput>;
  id?: InputMaybe<IdFilter>;
  localLink?: InputMaybe<UploadLocationLocalWhereInput>;
  project?: InputMaybe<UploadProjectWhereInput>;
  s3Link?: InputMaybe<UploadLocationS3WhereInput>;
  type?: InputMaybe<StringFilter>;
};

export type UploadLocationWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  project?: InputMaybe<UploadProjectWhereUniqueInput>;
};

export type UploadManyRelationFilter = {
  every?: InputMaybe<UploadWhereInput>;
  none?: InputMaybe<UploadWhereInput>;
  some?: InputMaybe<UploadWhereInput>;
};

export type UploadOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  scheduledFor?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  uploadStatus?: InputMaybe<OrderDirection>;
  uploadTo?: InputMaybe<OrderDirection>;
};

export type UploadProject = {
  __typename?: "UploadProject";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  deletedAt?: Maybe<Scalars["DateTime"]["output"]>;
  description?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  projectName?: Maybe<Scalars["String"]["output"]>;
  status?: Maybe<Scalars["String"]["output"]>;
  updatedAt?: Maybe<Scalars["DateTime"]["output"]>;
  uploadLocation?: Maybe<UploadLocation>;
  uploadsTo?: Maybe<Array<Upload>>;
  uploadsToCount?: Maybe<Scalars["Int"]["output"]>;
  user?: Maybe<User>;
};

export type UploadProjectUploadsToArgs = {
  cursor?: InputMaybe<UploadWhereUniqueInput>;
  orderBy?: Array<UploadOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UploadWhereInput;
};

export type UploadProjectUploadsToCountArgs = {
  where?: UploadWhereInput;
};

export type UploadProjectCreateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  deletedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  projectName?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  uploadLocation?: InputMaybe<UploadLocationRelateToOneForCreateInput>;
  uploadsTo?: InputMaybe<UploadRelateToManyForCreateInput>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type UploadProjectManyRelationFilter = {
  every?: InputMaybe<UploadProjectWhereInput>;
  none?: InputMaybe<UploadProjectWhereInput>;
  some?: InputMaybe<UploadProjectWhereInput>;
};

export type UploadProjectOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  deletedAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  projectName?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type UploadProjectRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UploadProjectWhereUniqueInput>>;
  create?: InputMaybe<Array<UploadProjectCreateInput>>;
};

export type UploadProjectRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UploadProjectWhereUniqueInput>>;
  create?: InputMaybe<Array<UploadProjectCreateInput>>;
  disconnect?: InputMaybe<Array<UploadProjectWhereUniqueInput>>;
  set?: InputMaybe<Array<UploadProjectWhereUniqueInput>>;
};

export type UploadProjectRelateToOneForCreateInput = {
  connect?: InputMaybe<UploadProjectWhereUniqueInput>;
  create?: InputMaybe<UploadProjectCreateInput>;
};

export type UploadProjectRelateToOneForUpdateInput = {
  connect?: InputMaybe<UploadProjectWhereUniqueInput>;
  create?: InputMaybe<UploadProjectCreateInput>;
  disconnect?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UploadProjectUpdateArgs = {
  data: UploadProjectUpdateInput;
  where: UploadProjectWhereUniqueInput;
};

export type UploadProjectUpdateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  deletedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  description?: InputMaybe<Scalars["String"]["input"]>;
  projectName?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  uploadLocation?: InputMaybe<UploadLocationRelateToOneForUpdateInput>;
  uploadsTo?: InputMaybe<UploadRelateToManyForUpdateInput>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type UploadProjectWhereInput = {
  AND?: InputMaybe<Array<UploadProjectWhereInput>>;
  NOT?: InputMaybe<Array<UploadProjectWhereInput>>;
  OR?: InputMaybe<Array<UploadProjectWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  deletedAt?: InputMaybe<DateTimeNullableFilter>;
  description?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  projectName?: InputMaybe<StringFilter>;
  status?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  uploadLocation?: InputMaybe<UploadLocationWhereInput>;
  uploadsTo?: InputMaybe<UploadManyRelationFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type UploadProjectWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
  uploadLocation?: InputMaybe<UploadLocationWhereUniqueInput>;
};

export type UploadRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UploadWhereUniqueInput>>;
  create?: InputMaybe<Array<UploadCreateInput>>;
};

export type UploadRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UploadWhereUniqueInput>>;
  create?: InputMaybe<Array<UploadCreateInput>>;
  disconnect?: InputMaybe<Array<UploadWhereUniqueInput>>;
  set?: InputMaybe<Array<UploadWhereUniqueInput>>;
};

export type UploadUpdateArgs = {
  data: UploadUpdateInput;
  where: UploadWhereUniqueInput;
};

export type UploadUpdateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  project?: InputMaybe<UploadProjectRelateToOneForUpdateInput>;
  scheduledFor?: InputMaybe<Scalars["DateTime"]["input"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  uploadStatus?: InputMaybe<Scalars["String"]["input"]>;
  uploadTo?: InputMaybe<Scalars["String"]["input"]>;
};

export type UploadWhereInput = {
  AND?: InputMaybe<Array<UploadWhereInput>>;
  NOT?: InputMaybe<Array<UploadWhereInput>>;
  OR?: InputMaybe<Array<UploadWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  id?: InputMaybe<IdFilter>;
  project?: InputMaybe<UploadProjectWhereInput>;
  scheduledFor?: InputMaybe<DateTimeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeNullableFilter>;
  uploadStatus?: InputMaybe<StringNullableFilter>;
  uploadTo?: InputMaybe<StringFilter>;
};

export type UploadWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type User = {
  __typename?: "User";
  createdAt?: Maybe<Scalars["DateTime"]["output"]>;
  email?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  isAdmin?: Maybe<Scalars["Boolean"]["output"]>;
  name?: Maybe<Scalars["String"]["output"]>;
  password?: Maybe<PasswordState>;
  projects?: Maybe<Array<UploadProject>>;
  projectsCount?: Maybe<Scalars["Int"]["output"]>;
  tokens?: Maybe<Array<UserToken>>;
  tokensCount?: Maybe<Scalars["Int"]["output"]>;
};

export type UserProjectsArgs = {
  cursor?: InputMaybe<UploadProjectWhereUniqueInput>;
  orderBy?: Array<UploadProjectOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UploadProjectWhereInput;
};

export type UserProjectsCountArgs = {
  where?: UploadProjectWhereInput;
};

export type UserTokensArgs = {
  cursor?: InputMaybe<UserTokenWhereUniqueInput>;
  orderBy?: Array<UserTokenOrderByInput>;
  skip?: Scalars["Int"]["input"];
  take?: InputMaybe<Scalars["Int"]["input"]>;
  where?: UserTokenWhereInput;
};

export type UserTokensCountArgs = {
  where?: UserTokenWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: "UserAuthenticationWithPasswordFailure";
  message: Scalars["String"]["output"];
};

export type UserAuthenticationWithPasswordResult =
  | UserAuthenticationWithPasswordFailure
  | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: "UserAuthenticationWithPasswordSuccess";
  item: User;
  sessionToken: Scalars["String"]["output"];
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  isAdmin?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  projects?: InputMaybe<UploadProjectRelateToManyForCreateInput>;
  tokens?: InputMaybe<UserTokenRelateToManyForCreateInput>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isAdmin?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars["Boolean"]["input"]>;
};

export type UserToken = {
  __typename?: "UserToken";
  accessToken?: Maybe<Scalars["String"]["output"]>;
  expiryDate?: Maybe<Scalars["DateTime"]["output"]>;
  id: Scalars["ID"]["output"];
  refreshToken?: Maybe<Scalars["String"]["output"]>;
  scopes?: Maybe<Scalars["String"]["output"]>;
  tokenFor?: Maybe<Scalars["String"]["output"]>;
  user?: Maybe<User>;
};

export type UserTokenCreateInput = {
  accessToken?: InputMaybe<Scalars["String"]["input"]>;
  expiryDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  refreshToken?: InputMaybe<Scalars["String"]["input"]>;
  scopes?: InputMaybe<Scalars["String"]["input"]>;
  tokenFor?: InputMaybe<Scalars["String"]["input"]>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type UserTokenManyRelationFilter = {
  every?: InputMaybe<UserTokenWhereInput>;
  none?: InputMaybe<UserTokenWhereInput>;
  some?: InputMaybe<UserTokenWhereInput>;
};

export type UserTokenOrderByInput = {
  accessToken?: InputMaybe<OrderDirection>;
  expiryDate?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  refreshToken?: InputMaybe<OrderDirection>;
  scopes?: InputMaybe<OrderDirection>;
  tokenFor?: InputMaybe<OrderDirection>;
};

export type UserTokenRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserTokenWhereUniqueInput>>;
  create?: InputMaybe<Array<UserTokenCreateInput>>;
};

export type UserTokenRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserTokenWhereUniqueInput>>;
  create?: InputMaybe<Array<UserTokenCreateInput>>;
  disconnect?: InputMaybe<Array<UserTokenWhereUniqueInput>>;
  set?: InputMaybe<Array<UserTokenWhereUniqueInput>>;
};

export type UserTokenUpdateArgs = {
  data: UserTokenUpdateInput;
  where: UserTokenWhereUniqueInput;
};

export type UserTokenUpdateInput = {
  accessToken?: InputMaybe<Scalars["String"]["input"]>;
  expiryDate?: InputMaybe<Scalars["DateTime"]["input"]>;
  refreshToken?: InputMaybe<Scalars["String"]["input"]>;
  scopes?: InputMaybe<Scalars["String"]["input"]>;
  tokenFor?: InputMaybe<Scalars["String"]["input"]>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type UserTokenWhereInput = {
  AND?: InputMaybe<Array<UserTokenWhereInput>>;
  NOT?: InputMaybe<Array<UserTokenWhereInput>>;
  OR?: InputMaybe<Array<UserTokenWhereInput>>;
  accessToken?: InputMaybe<StringFilter>;
  expiryDate?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  refreshToken?: InputMaybe<StringFilter>;
  scopes?: InputMaybe<StringFilter>;
  tokenFor?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type UserTokenWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]["input"]>;
  email?: InputMaybe<Scalars["String"]["input"]>;
  isAdmin?: InputMaybe<Scalars["Boolean"]["input"]>;
  name?: InputMaybe<Scalars["String"]["input"]>;
  password?: InputMaybe<Scalars["String"]["input"]>;
  projects?: InputMaybe<UploadProjectRelateToManyForUpdateInput>;
  tokens?: InputMaybe<UserTokenRelateToManyForUpdateInput>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeNullableFilter>;
  email?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  isAdmin?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  projects?: InputMaybe<UploadProjectManyRelationFilter>;
  tokens?: InputMaybe<UserTokenManyRelationFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars["String"]["input"]>;
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type Video = {
  __typename?: "Video";
  description?: Maybe<Scalars["String"]["output"]>;
  filePath?: Maybe<Scalars["String"]["output"]>;
  id: Scalars["ID"]["output"];
  status?: Maybe<Scalars["String"]["output"]>;
  title?: Maybe<Scalars["String"]["output"]>;
  uploadedAt?: Maybe<Scalars["DateTime"]["output"]>;
};

export type VideoCreateInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  filePath?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  uploadedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type VideoOrderByInput = {
  description?: InputMaybe<OrderDirection>;
  filePath?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  uploadedAt?: InputMaybe<OrderDirection>;
};

export type VideoUpdateArgs = {
  data: VideoUpdateInput;
  where: VideoWhereUniqueInput;
};

export type VideoUpdateInput = {
  description?: InputMaybe<Scalars["String"]["input"]>;
  filePath?: InputMaybe<Scalars["String"]["input"]>;
  status?: InputMaybe<Scalars["String"]["input"]>;
  title?: InputMaybe<Scalars["String"]["input"]>;
  uploadedAt?: InputMaybe<Scalars["DateTime"]["input"]>;
};

export type VideoWhereInput = {
  AND?: InputMaybe<Array<VideoWhereInput>>;
  NOT?: InputMaybe<Array<VideoWhereInput>>;
  OR?: InputMaybe<Array<VideoWhereInput>>;
  description?: InputMaybe<StringFilter>;
  filePath?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  status?: InputMaybe<StringNullableFilter>;
  title?: InputMaybe<StringFilter>;
  uploadedAt?: InputMaybe<DateTimeNullableFilter>;
};

export type VideoWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]["input"]>;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: "Mutation"; endSession: boolean };

export type SignInMutationVariables = Exact<{
  email: Scalars["String"]["input"];
  password: Scalars["String"]["input"];
}>;

export type SignInMutation = {
  __typename?: "Mutation";
  authenticateUserWithPassword?:
    | { __typename?: "UserAuthenticationWithPasswordFailure"; message: string }
    | {
        __typename?: "UserAuthenticationWithPasswordSuccess";
        sessionToken: string;
        item: {
          __typename?: "User";
          id: string;
          name?: string | null;
          email?: string | null;
        };
      }
    | null;
};

export type CreateNewProjectMutationVariables = Exact<{
  data: UploadProjectCreateInput;
}>;

export type CreateNewProjectMutation = {
  __typename?: "Mutation";
  createUploadProject?: { __typename?: "UploadProject"; id: string } | null;
};

export type UpdateProjectMutationVariables = Exact<{
  where: UploadProjectWhereUniqueInput;
  data: UploadProjectUpdateInput;
}>;

export type UpdateProjectMutation = {
  __typename?: "Mutation";
  updateUploadProject?: { __typename?: "UploadProject"; id: string } | null;
};

export type CreateUploadLocationMutationVariables = Exact<{
  data: UploadLocationCreateInput;
}>;

export type CreateUploadLocationMutation = {
  __typename?: "Mutation";
  createUploadLocation?: {
    __typename?: "UploadLocation";
    id: string;
    type?: string | null;
  } | null;
};

export type DeleteUploadLocationMutationVariables = Exact<{
  where: UploadLocationWhereUniqueInput;
}>;

export type DeleteUploadLocationMutation = {
  __typename?: "Mutation";
  deleteUploadLocation?: { __typename?: "UploadLocation"; id: string } | null;
};

export type UpdateUploadLocationMutationVariables = Exact<{
  where: UploadLocationWhereUniqueInput;
  data: UploadLocationUpdateInput;
}>;

export type UpdateUploadLocationMutation = {
  __typename?: "Mutation";
  updateUploadLocation?: { __typename?: "UploadLocation"; id: string } | null;
};

export type CreateUploadMutationVariables = Exact<{
  data: UploadCreateInput;
}>;

export type CreateUploadMutation = {
  __typename?: "Mutation";
  createUpload?: { __typename?: "Upload"; id: string } | null;
};

export type DeleteUploadMutationVariables = Exact<{
  where: UploadWhereUniqueInput;
}>;

export type DeleteUploadMutation = {
  __typename?: "Mutation";
  deleteUpload?: { __typename?: "Upload"; id: string } | null;
};

export type UpdateUploadMutationVariables = Exact<{
  where: UploadWhereUniqueInput;
  data: UploadUpdateInput;
}>;

export type UpdateUploadMutation = {
  __typename?: "Mutation";
  updateUpload?: { __typename?: "Upload"; id: string } | null;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: "Query";
  authenticatedItem?: {
    __typename?: "User";
    id: string;
    name?: string | null;
    email?: string | null;
    isAdmin?: boolean | null;
    tokens?: Array<{
      __typename?: "UserToken";
      id: string;
      tokenFor?: string | null;
    }> | null;
  } | null;
};

export type YouTubeAuthUrlQueryVariables = Exact<{ [key: string]: never }>;

export type YouTubeAuthUrlQuery = {
  __typename?: "Query";
  youtubeAuthUrl?: string | null;
};

export type GetUploadProjectQueryVariables = Exact<{
  where: UploadProjectWhereUniqueInput;
}>;

export type GetUploadProjectQuery = {
  __typename?: "Query";
  uploadProject?: {
    __typename?: "UploadProject";
    id: string;
    projectName?: string | null;
    description?: string | null;
    status?: string | null;
    uploadsToCount?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    deletedAt?: any | null;
    user?: { __typename?: "User"; name?: string | null } | null;
    uploadLocation?: {
      __typename?: "UploadLocation";
      id: string;
      type?: string | null;
      localLink?: {
        __typename?: "UploadLocationLocal";
        id: string;
        path?: string | null;
      } | null;
      s3Link?: {
        __typename?: "UploadLocationS3";
        id: string;
        key?: string | null;
        bucket?: string | null;
      } | null;
      googleDrive?: {
        __typename?: "UploadLocationGoogleDrive";
        id: string;
        name?: string | null;
        driveId?: string | null;
      } | null;
    } | null;
    uploadsTo?: Array<{
      __typename?: "Upload";
      id: string;
      uploadStatus?: string | null;
      uploadTo?: string | null;
      scheduledFor?: any | null;
    }> | null;
  } | null;
};

export type GetUploadProjectsQueryVariables = Exact<{
  where: UploadProjectWhereInput;
  take?: InputMaybe<Scalars["Int"]["input"]>;
  skip: Scalars["Int"]["input"];
}>;

export type GetUploadProjectsQuery = {
  __typename?: "Query";
  uploadProjects?: Array<{
    __typename?: "UploadProject";
    id: string;
    projectName?: string | null;
    description?: string | null;
    status?: string | null;
    uploadsToCount?: number | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    deletedAt?: any | null;
    user?: { __typename?: "User"; name?: string | null } | null;
    uploadLocation?: {
      __typename?: "UploadLocation";
      id: string;
      type?: string | null;
    } | null;
    uploadsTo?: Array<{
      __typename?: "Upload";
      id: string;
      uploadStatus?: string | null;
      uploadTo?: string | null;
    }> | null;
  }> | null;
};

export type UserStatisticsReportQueryVariables = Exact<{
  userId: Scalars["ID"]["input"];
}>;

export type UserStatisticsReportQuery = {
  __typename?: "Query";
  userActiveProjectsCount?: number | null;
  createdProjectsCount?: number | null;
  activeTasksCount?: number | null;
  failedTasksCount?: number | null;
  completedTasksCount?: number | null;
  totalTasksCount?: number | null;
};

export const LogoutDocument = gql`
  mutation Logout {
    endSession
  }
`;
export type LogoutMutationFn = ApolloReactCommon.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

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
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult =
  ApolloReactCommon.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = ApolloReactCommon.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const SignInDocument = gql`
  mutation SignIn($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        sessionToken
        item {
          id
          name
          email
        }
      }
      ... on UserAuthenticationWithPasswordFailure {
        message
      }
    }
  }
`;
export type SignInMutationFn = ApolloReactCommon.MutationFunction<
  SignInMutation,
  SignInMutationVariables
>;

/**
 * __useSignInMutation__
 *
 * To run a mutation, you first call `useSignInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signInMutation, { data, loading, error }] = useSignInMutation({
 *   variables: {
 *      email: // value for 'email'
 *      password: // value for 'password'
 *   },
 * });
 */
export function useSignInMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    SignInMutation,
    SignInMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<SignInMutation, SignInMutationVariables>(
    SignInDocument,
    options,
  );
}
export type SignInMutationHookResult = ReturnType<typeof useSignInMutation>;
export type SignInMutationResult =
  ApolloReactCommon.MutationResult<SignInMutation>;
export type SignInMutationOptions = ApolloReactCommon.BaseMutationOptions<
  SignInMutation,
  SignInMutationVariables
>;
export const CreateNewProjectDocument = gql`
  mutation CreateNewProject($data: UploadProjectCreateInput!) {
    createUploadProject(data: $data) {
      id
    }
  }
`;
export type CreateNewProjectMutationFn = ApolloReactCommon.MutationFunction<
  CreateNewProjectMutation,
  CreateNewProjectMutationVariables
>;

/**
 * __useCreateNewProjectMutation__
 *
 * To run a mutation, you first call `useCreateNewProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateNewProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createNewProjectMutation, { data, loading, error }] = useCreateNewProjectMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateNewProjectMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateNewProjectMutation,
    CreateNewProjectMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateNewProjectMutation,
    CreateNewProjectMutationVariables
  >(CreateNewProjectDocument, options);
}
export type CreateNewProjectMutationHookResult = ReturnType<
  typeof useCreateNewProjectMutation
>;
export type CreateNewProjectMutationResult =
  ApolloReactCommon.MutationResult<CreateNewProjectMutation>;
export type CreateNewProjectMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    CreateNewProjectMutation,
    CreateNewProjectMutationVariables
  >;
export const UpdateProjectDocument = gql`
  mutation UpdateProject(
    $where: UploadProjectWhereUniqueInput!
    $data: UploadProjectUpdateInput!
  ) {
    updateUploadProject(where: $where, data: $data) {
      id
    }
  }
`;
export type UpdateProjectMutationFn = ApolloReactCommon.MutationFunction<
  UpdateProjectMutation,
  UpdateProjectMutationVariables
>;

/**
 * __useUpdateProjectMutation__
 *
 * To run a mutation, you first call `useUpdateProjectMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProjectMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProjectMutation, { data, loading, error }] = useUpdateProjectMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateProjectMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >(UpdateProjectDocument, options);
}
export type UpdateProjectMutationHookResult = ReturnType<
  typeof useUpdateProjectMutation
>;
export type UpdateProjectMutationResult =
  ApolloReactCommon.MutationResult<UpdateProjectMutation>;
export type UpdateProjectMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    UpdateProjectMutation,
    UpdateProjectMutationVariables
  >;
export const CreateUploadLocationDocument = gql`
  mutation CreateUploadLocation($data: UploadLocationCreateInput!) {
    createUploadLocation(data: $data) {
      id
      type
    }
  }
`;
export type CreateUploadLocationMutationFn = ApolloReactCommon.MutationFunction<
  CreateUploadLocationMutation,
  CreateUploadLocationMutationVariables
>;

/**
 * __useCreateUploadLocationMutation__
 *
 * To run a mutation, you first call `useCreateUploadLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUploadLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUploadLocationMutation, { data, loading, error }] = useCreateUploadLocationMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUploadLocationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateUploadLocationMutation,
    CreateUploadLocationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateUploadLocationMutation,
    CreateUploadLocationMutationVariables
  >(CreateUploadLocationDocument, options);
}
export type CreateUploadLocationMutationHookResult = ReturnType<
  typeof useCreateUploadLocationMutation
>;
export type CreateUploadLocationMutationResult =
  ApolloReactCommon.MutationResult<CreateUploadLocationMutation>;
export type CreateUploadLocationMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    CreateUploadLocationMutation,
    CreateUploadLocationMutationVariables
  >;
export const DeleteUploadLocationDocument = gql`
  mutation DeleteUploadLocation($where: UploadLocationWhereUniqueInput!) {
    deleteUploadLocation(where: $where) {
      id
    }
  }
`;
export type DeleteUploadLocationMutationFn = ApolloReactCommon.MutationFunction<
  DeleteUploadLocationMutation,
  DeleteUploadLocationMutationVariables
>;

/**
 * __useDeleteUploadLocationMutation__
 *
 * To run a mutation, you first call `useDeleteUploadLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUploadLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUploadLocationMutation, { data, loading, error }] = useDeleteUploadLocationMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteUploadLocationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteUploadLocationMutation,
    DeleteUploadLocationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    DeleteUploadLocationMutation,
    DeleteUploadLocationMutationVariables
  >(DeleteUploadLocationDocument, options);
}
export type DeleteUploadLocationMutationHookResult = ReturnType<
  typeof useDeleteUploadLocationMutation
>;
export type DeleteUploadLocationMutationResult =
  ApolloReactCommon.MutationResult<DeleteUploadLocationMutation>;
export type DeleteUploadLocationMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    DeleteUploadLocationMutation,
    DeleteUploadLocationMutationVariables
  >;
export const UpdateUploadLocationDocument = gql`
  mutation UpdateUploadLocation(
    $where: UploadLocationWhereUniqueInput!
    $data: UploadLocationUpdateInput!
  ) {
    updateUploadLocation(where: $where, data: $data) {
      id
    }
  }
`;
export type UpdateUploadLocationMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUploadLocationMutation,
  UpdateUploadLocationMutationVariables
>;

/**
 * __useUpdateUploadLocationMutation__
 *
 * To run a mutation, you first call `useUpdateUploadLocationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUploadLocationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUploadLocationMutation, { data, loading, error }] = useUpdateUploadLocationMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUploadLocationMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUploadLocationMutation,
    UpdateUploadLocationMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateUploadLocationMutation,
    UpdateUploadLocationMutationVariables
  >(UpdateUploadLocationDocument, options);
}
export type UpdateUploadLocationMutationHookResult = ReturnType<
  typeof useUpdateUploadLocationMutation
>;
export type UpdateUploadLocationMutationResult =
  ApolloReactCommon.MutationResult<UpdateUploadLocationMutation>;
export type UpdateUploadLocationMutationOptions =
  ApolloReactCommon.BaseMutationOptions<
    UpdateUploadLocationMutation,
    UpdateUploadLocationMutationVariables
  >;
export const CreateUploadDocument = gql`
  mutation CreateUpload($data: UploadCreateInput!) {
    createUpload(data: $data) {
      id
    }
  }
`;
export type CreateUploadMutationFn = ApolloReactCommon.MutationFunction<
  CreateUploadMutation,
  CreateUploadMutationVariables
>;

/**
 * __useCreateUploadMutation__
 *
 * To run a mutation, you first call `useCreateUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createUploadMutation, { data, loading, error }] = useCreateUploadMutation({
 *   variables: {
 *      data: // value for 'data'
 *   },
 * });
 */
export function useCreateUploadMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    CreateUploadMutation,
    CreateUploadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    CreateUploadMutation,
    CreateUploadMutationVariables
  >(CreateUploadDocument, options);
}
export type CreateUploadMutationHookResult = ReturnType<
  typeof useCreateUploadMutation
>;
export type CreateUploadMutationResult =
  ApolloReactCommon.MutationResult<CreateUploadMutation>;
export type CreateUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<
  CreateUploadMutation,
  CreateUploadMutationVariables
>;
export const DeleteUploadDocument = gql`
  mutation DeleteUpload($where: UploadWhereUniqueInput!) {
    deleteUpload(where: $where) {
      id
    }
  }
`;
export type DeleteUploadMutationFn = ApolloReactCommon.MutationFunction<
  DeleteUploadMutation,
  DeleteUploadMutationVariables
>;

/**
 * __useDeleteUploadMutation__
 *
 * To run a mutation, you first call `useDeleteUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteUploadMutation, { data, loading, error }] = useDeleteUploadMutation({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useDeleteUploadMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    DeleteUploadMutation,
    DeleteUploadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    DeleteUploadMutation,
    DeleteUploadMutationVariables
  >(DeleteUploadDocument, options);
}
export type DeleteUploadMutationHookResult = ReturnType<
  typeof useDeleteUploadMutation
>;
export type DeleteUploadMutationResult =
  ApolloReactCommon.MutationResult<DeleteUploadMutation>;
export type DeleteUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<
  DeleteUploadMutation,
  DeleteUploadMutationVariables
>;
export const UpdateUploadDocument = gql`
  mutation UpdateUpload(
    $where: UploadWhereUniqueInput!
    $data: UploadUpdateInput!
  ) {
    updateUpload(where: $where, data: $data) {
      id
    }
  }
`;
export type UpdateUploadMutationFn = ApolloReactCommon.MutationFunction<
  UpdateUploadMutation,
  UpdateUploadMutationVariables
>;

/**
 * __useUpdateUploadMutation__
 *
 * To run a mutation, you first call `useUpdateUploadMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateUploadMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateUploadMutation, { data, loading, error }] = useUpdateUploadMutation({
 *   variables: {
 *      where: // value for 'where'
 *      data: // value for 'data'
 *   },
 * });
 */
export function useUpdateUploadMutation(
  baseOptions?: ApolloReactHooks.MutationHookOptions<
    UpdateUploadMutation,
    UpdateUploadMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useMutation<
    UpdateUploadMutation,
    UpdateUploadMutationVariables
  >(UpdateUploadDocument, options);
}
export type UpdateUploadMutationHookResult = ReturnType<
  typeof useUpdateUploadMutation
>;
export type UpdateUploadMutationResult =
  ApolloReactCommon.MutationResult<UpdateUploadMutation>;
export type UpdateUploadMutationOptions = ApolloReactCommon.BaseMutationOptions<
  UpdateUploadMutation,
  UpdateUploadMutationVariables
>;
export const MeDocument = gql`
  query Me {
    authenticatedItem {
      ... on User {
        id
        name
        email
        isAdmin
        tokens {
          id
          tokenFor
        }
      }
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
export function useMeQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    options,
  );
}
export function useMeLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    MeQuery,
    MeQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    options,
  );
}
export function useMeSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<MeQuery, MeQueryVariables>(
    MeDocument,
    options,
  );
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeSuspenseQueryHookResult = ReturnType<typeof useMeSuspenseQuery>;
export type MeQueryResult = ApolloReactCommon.QueryResult<
  MeQuery,
  MeQueryVariables
>;
export const YouTubeAuthUrlDocument = gql`
  query YouTubeAuthUrl {
    youtubeAuthUrl
  }
`;

/**
 * __useYouTubeAuthUrlQuery__
 *
 * To run a query within a React component, call `useYouTubeAuthUrlQuery` and pass it any options that fit your needs.
 * When your component renders, `useYouTubeAuthUrlQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useYouTubeAuthUrlQuery({
 *   variables: {
 *   },
 * });
 */
export function useYouTubeAuthUrlQuery(
  baseOptions?: ApolloReactHooks.QueryHookOptions<
    YouTubeAuthUrlQuery,
    YouTubeAuthUrlQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    YouTubeAuthUrlQuery,
    YouTubeAuthUrlQueryVariables
  >(YouTubeAuthUrlDocument, options);
}
export function useYouTubeAuthUrlLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    YouTubeAuthUrlQuery,
    YouTubeAuthUrlQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    YouTubeAuthUrlQuery,
    YouTubeAuthUrlQueryVariables
  >(YouTubeAuthUrlDocument, options);
}
export function useYouTubeAuthUrlSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        YouTubeAuthUrlQuery,
        YouTubeAuthUrlQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    YouTubeAuthUrlQuery,
    YouTubeAuthUrlQueryVariables
  >(YouTubeAuthUrlDocument, options);
}
export type YouTubeAuthUrlQueryHookResult = ReturnType<
  typeof useYouTubeAuthUrlQuery
>;
export type YouTubeAuthUrlLazyQueryHookResult = ReturnType<
  typeof useYouTubeAuthUrlLazyQuery
>;
export type YouTubeAuthUrlSuspenseQueryHookResult = ReturnType<
  typeof useYouTubeAuthUrlSuspenseQuery
>;
export type YouTubeAuthUrlQueryResult = ApolloReactCommon.QueryResult<
  YouTubeAuthUrlQuery,
  YouTubeAuthUrlQueryVariables
>;
export const GetUploadProjectDocument = gql`
  query GetUploadProject($where: UploadProjectWhereUniqueInput!) {
    uploadProject(where: $where) {
      id
      projectName
      description
      user {
        name
      }
      status
      uploadLocation {
        id
        type
        localLink {
          id
          path
        }
        s3Link {
          id
          key
          bucket
        }
        googleDrive {
          id
          name
          driveId
        }
      }
      uploadsTo {
        id
        uploadStatus
        uploadTo
        scheduledFor
      }
      uploadsToCount
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

/**
 * __useGetUploadProjectQuery__
 *
 * To run a query within a React component, call `useGetUploadProjectQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUploadProjectQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUploadProjectQuery({
 *   variables: {
 *      where: // value for 'where'
 *   },
 * });
 */
export function useGetUploadProjectQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetUploadProjectQuery,
    GetUploadProjectQueryVariables
  > &
    (
      | { variables: GetUploadProjectQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetUploadProjectQuery,
    GetUploadProjectQueryVariables
  >(GetUploadProjectDocument, options);
}
export function useGetUploadProjectLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUploadProjectQuery,
    GetUploadProjectQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetUploadProjectQuery,
    GetUploadProjectQueryVariables
  >(GetUploadProjectDocument, options);
}
export function useGetUploadProjectSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetUploadProjectQuery,
        GetUploadProjectQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetUploadProjectQuery,
    GetUploadProjectQueryVariables
  >(GetUploadProjectDocument, options);
}
export type GetUploadProjectQueryHookResult = ReturnType<
  typeof useGetUploadProjectQuery
>;
export type GetUploadProjectLazyQueryHookResult = ReturnType<
  typeof useGetUploadProjectLazyQuery
>;
export type GetUploadProjectSuspenseQueryHookResult = ReturnType<
  typeof useGetUploadProjectSuspenseQuery
>;
export type GetUploadProjectQueryResult = ApolloReactCommon.QueryResult<
  GetUploadProjectQuery,
  GetUploadProjectQueryVariables
>;
export const GetUploadProjectsDocument = gql`
  query GetUploadProjects(
    $where: UploadProjectWhereInput!
    $take: Int
    $skip: Int!
  ) {
    uploadProjects(
      where: $where
      take: $take
      skip: $skip
      orderBy: { updatedAt: desc }
    ) {
      id
      projectName
      description
      user {
        name
      }
      status
      uploadLocation {
        id
        type
      }
      uploadsTo {
        id
        uploadStatus
        uploadTo
      }
      uploadsToCount
      createdAt
      updatedAt
      deletedAt
    }
  }
`;

/**
 * __useGetUploadProjectsQuery__
 *
 * To run a query within a React component, call `useGetUploadProjectsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUploadProjectsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUploadProjectsQuery({
 *   variables: {
 *      where: // value for 'where'
 *      take: // value for 'take'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useGetUploadProjectsQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    GetUploadProjectsQuery,
    GetUploadProjectsQueryVariables
  > &
    (
      | { variables: GetUploadProjectsQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    GetUploadProjectsQuery,
    GetUploadProjectsQueryVariables
  >(GetUploadProjectsDocument, options);
}
export function useGetUploadProjectsLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    GetUploadProjectsQuery,
    GetUploadProjectsQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    GetUploadProjectsQuery,
    GetUploadProjectsQueryVariables
  >(GetUploadProjectsDocument, options);
}
export function useGetUploadProjectsSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        GetUploadProjectsQuery,
        GetUploadProjectsQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    GetUploadProjectsQuery,
    GetUploadProjectsQueryVariables
  >(GetUploadProjectsDocument, options);
}
export type GetUploadProjectsQueryHookResult = ReturnType<
  typeof useGetUploadProjectsQuery
>;
export type GetUploadProjectsLazyQueryHookResult = ReturnType<
  typeof useGetUploadProjectsLazyQuery
>;
export type GetUploadProjectsSuspenseQueryHookResult = ReturnType<
  typeof useGetUploadProjectsSuspenseQuery
>;
export type GetUploadProjectsQueryResult = ApolloReactCommon.QueryResult<
  GetUploadProjectsQuery,
  GetUploadProjectsQueryVariables
>;
export const UserStatisticsReportDocument = gql`
  query UserStatisticsReport($userId: ID!) {
    userActiveProjectsCount: uploadProjectsCount(
      where: {
        AND: { user: { id: { equals: $userId } }, deletedAt: { equals: null } }
      }
    )
    createdProjectsCount: auditsCount(
      where: {
        AND: {
          tableName: { equals: "UploadProject" }
          type: { equals: "CREATE" }
          createdBy: { id: { equals: $userId } }
        }
      }
    )
    activeTasksCount: uploadsCount(
      where: {
        AND: [
          {
            project: { user: { id: { equals: $userId } } }
            uploadStatus: { notIn: ["FAILED", "COMPLETED"] }
          }
        ]
      }
    )
    failedTasksCount: uploadsCount(
      where: {
        AND: [
          {
            project: { user: { id: { equals: $userId } } }
            uploadStatus: { equals: "FAILED" }
          }
        ]
      }
    )
    completedTasksCount: uploadsCount(
      where: {
        AND: [
          {
            project: { user: { id: { equals: $userId } } }
            uploadStatus: { equals: "COMPLETED" }
          }
        ]
      }
    )
    totalTasksCount: uploadsCount(
      where: { AND: [{ project: { user: { id: { equals: $userId } } } }] }
    )
  }
`;

/**
 * __useUserStatisticsReportQuery__
 *
 * To run a query within a React component, call `useUserStatisticsReportQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserStatisticsReportQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserStatisticsReportQuery({
 *   variables: {
 *      userId: // value for 'userId'
 *   },
 * });
 */
export function useUserStatisticsReportQuery(
  baseOptions: ApolloReactHooks.QueryHookOptions<
    UserStatisticsReportQuery,
    UserStatisticsReportQueryVariables
  > &
    (
      | { variables: UserStatisticsReportQueryVariables; skip?: boolean }
      | { skip: boolean }
    ),
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useQuery<
    UserStatisticsReportQuery,
    UserStatisticsReportQueryVariables
  >(UserStatisticsReportDocument, options);
}
export function useUserStatisticsReportLazyQuery(
  baseOptions?: ApolloReactHooks.LazyQueryHookOptions<
    UserStatisticsReportQuery,
    UserStatisticsReportQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useLazyQuery<
    UserStatisticsReportQuery,
    UserStatisticsReportQueryVariables
  >(UserStatisticsReportDocument, options);
}
export function useUserStatisticsReportSuspenseQuery(
  baseOptions?:
    | ApolloReactHooks.SkipToken
    | ApolloReactHooks.SuspenseQueryHookOptions<
        UserStatisticsReportQuery,
        UserStatisticsReportQueryVariables
      >,
) {
  const options =
    baseOptions === ApolloReactHooks.skipToken
      ? baseOptions
      : { ...defaultOptions, ...baseOptions };
  return ApolloReactHooks.useSuspenseQuery<
    UserStatisticsReportQuery,
    UserStatisticsReportQueryVariables
  >(UserStatisticsReportDocument, options);
}
export type UserStatisticsReportQueryHookResult = ReturnType<
  typeof useUserStatisticsReportQuery
>;
export type UserStatisticsReportLazyQueryHookResult = ReturnType<
  typeof useUserStatisticsReportLazyQuery
>;
export type UserStatisticsReportSuspenseQueryHookResult = ReturnType<
  typeof useUserStatisticsReportSuspenseQuery
>;
export type UserStatisticsReportQueryResult = ApolloReactCommon.QueryResult<
  UserStatisticsReportQuery,
  UserStatisticsReportQueryVariables
>;
