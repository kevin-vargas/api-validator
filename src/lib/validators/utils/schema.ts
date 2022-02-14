import {
  prop,
  compose,
  path,
  juxt,
  flatten,
  values,
  map,
  reject,
  isNil,
  equals,
  filter,
} from 'ramda';
//TODO: REVIEW SCHEMA
export type QueryParam = {
  in: string;
  name: string;
};
export type StatusResponse = {
  [key: string]: {
    description?: string;
  };
};
export type Parameters = {
  [key: string]: QueryParam;
};
export type ResourceInfo = {
  parameters?: QueryParam[];
  responses?: StatusResponse;
};
export type Methods = {
  [key: string]: ResourceInfo;
};

export type PathsUrl = {
  [key: string]: Methods;
};

export type Paths = {
  paths: PathsUrl;
};

export type Components = {
  parameters?: Parameters;
};

export type TypeSchema = {
  paths?: Paths;
  components?: Components;
};

type TypeGetQueryParam = (args: TypeSchema) => QueryParam[];

type TypeGetPathStatusResponse = (args: TypeSchema) => StatusResponse[];

type TypeGetPath = (args: TypeSchema) => PathsUrl;

export const getPath = path(['paths']) as TypeGetPath;

export const getPathBy = (predicate: (p: Methods) => boolean) =>
  compose(filter(predicate), getPath) as TypeGetPath;

const getPathQueryParams: TypeGetQueryParam = compose(
  reject(isNil) as (p: QueryParam[]) => QueryParam[],
  flatten,
  map(path(['parameters'])) as (p: ResourceInfo[]) => QueryParam[][],
  flatten,
  map(values) as (m: Methods[]) => ResourceInfo[][],
  values as (p: PathsUrl) => Methods[],
  getPath,
);

const getComponentQueryParams: TypeGetQueryParam = compose(
  path(['components', 'parameters']) as (s: TypeSchema) => QueryParam[],
);

export const getQueryParams: TypeGetQueryParam = compose(
  flatten as (q: QueryParam[][]) => QueryParam[],
  juxt([getPathQueryParams, getComponentQueryParams]),
);

export const getAllStatusResponseFromPathUrl = compose(
  map(path(['responses'])) as (p: ResourceInfo[]) => StatusResponse[],
  flatten,
  map(values) as (m: Methods[]) => ResourceInfo[][],
  values as (p: PathsUrl) => Methods[],
);

export const getPathStatusResponse: TypeGetPathStatusResponse = compose(
  getAllStatusResponseFromPathUrl,
  getPath,
);

//TODO: check io-ts for this. Safe assertion
export const assertSchemaType = (schema: unknown) => <TypeSchema>schema;

export const isInQuery = compose(equals('query'), prop('in')) as (
  q: QueryParam,
) => boolean;
