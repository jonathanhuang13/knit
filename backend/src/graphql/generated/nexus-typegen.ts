/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */


import type { Context } from "./../context"
import type { FieldAuthorizeResolver } from "nexus/dist/plugins/fieldAuthorizePlugin"




declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
}

export interface NexusGenEnums {
  UserRole: "admin" | "member"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Community: { // root type
    description?: string | null; // String
    id: number; // Int!
    name: string; // String!
  }
  CommunityUser: { // root type
    community: NexusGenRootTypes['Community']; // Community!
    role: NexusGenEnums['UserRole']; // UserRole!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: {};
  Query: {};
  User: { // root type
    email: string; // String!
    firstName?: string | null; // String
    id: number; // Int!
    lastName?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Community: { // field return type
    adminUsers: ReadonlyArray<NexusGenRootTypes['User']>; // [User!]!
    chatChannelId: string; // String!
    description: string | null; // String
    id: number; // Int!
    memberUsers: ReadonlyArray<NexusGenRootTypes['User']>; // [User!]!
    name: string; // String!
  }
  CommunityUser: { // field return type
    community: NexusGenRootTypes['Community']; // Community!
    role: NexusGenEnums['UserRole']; // UserRole!
    user: NexusGenRootTypes['User']; // User!
  }
  Mutation: { // field return type
    createUser: NexusGenRootTypes['User']; // User!
  }
  Query: { // field return type
    userByEmail: NexusGenRootTypes['User'] | null; // User
    users: ReadonlyArray<NexusGenRootTypes['User']>; // [User!]!
  }
  User: { // field return type
    adminCommunities: ReadonlyArray<NexusGenRootTypes['Community']>; // [Community!]!
    chatToken: string; // String!
    chatUserId: string; // String!
    email: string; // String!
    firstName: string | null; // String
    id: number; // Int!
    lastName: string | null; // String
    memberCommunities: ReadonlyArray<NexusGenRootTypes['Community']>; // [Community!]!
    secret: string; // String!
  }
}

export interface NexusGenFieldTypeNames {
  Community: { // field return type name
    adminUsers: 'User'
    chatChannelId: 'String'
    description: 'String'
    id: 'Int'
    memberUsers: 'User'
    name: 'String'
  }
  CommunityUser: { // field return type name
    community: 'Community'
    role: 'UserRole'
    user: 'User'
  }
  Mutation: { // field return type name
    createUser: 'User'
  }
  Query: { // field return type name
    userByEmail: 'User'
    users: 'User'
  }
  User: { // field return type name
    adminCommunities: 'Community'
    chatToken: 'String'
    chatUserId: 'String'
    email: 'String'
    firstName: 'String'
    id: 'Int'
    lastName: 'String'
    memberCommunities: 'Community'
    secret: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    createUser: { // args
      email: string; // String!
      firstName?: string | null; // String
      lastName?: string | null; // String
    }
  }
  Query: {
    userByEmail: { // args
      email: string; // String!
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = never;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenDirectives = never

export interface NexusGenDirectiveArgs {
}

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  directives: NexusGenDirectives;
  directiveArgs: NexusGenDirectiveArgs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
    /**
     * Authorization for an individual field. Returning "true"
     * or "Promise<true>" means the field can be accessed.
     * Returning "false" or "Promise<false>" will respond
     * with a "Not Authorized" error for the field.
     * Returning or throwing an error will also prevent the
     * resolver from executing.
     */
    authorize?: FieldAuthorizeResolver<TypeName, FieldName>
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
    /**
     * Whether the type can be null
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    nullable?: boolean
    /**
     * Whether the type is list of values, or just a single value.
     * If list is true, we assume the type is a list. If list is an array,
     * we'll assume that it's a list with the depth. The boolean indicates whether
     * the type is required (non-null), where true = nonNull, false = nullable.
     * @see declarativeWrappingPlugin
     */
    list?: true | boolean[]
    /**
     * Whether the type should be non null, `required: true` = `nullable: false`
     * @default (depends on whether nullability is configured in type or schema)
     * @see declarativeWrappingPlugin
     */
    required?: boolean
  }
}