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
} from 'ramda';

export type QueryParam = {
  in: string;
  name: string;
};
export type Parameters = {
  [key: string]: QueryParam;
};
export type PathsUrlMethod = {
  [key: string]: {
    parameters?: Parameters;
  };
};

export type PathsUrl = {
  [key: string]: PathsUrlMethod;
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

const getPathQueryParams: TypeGetQueryParam = compose(
  reject(isNil) as (p: QueryParam[]) => QueryParam[],
  flatten,
  //TODO: remove uknown
  map(prop('parameters')) as unknown as (p: Parameters[]) => QueryParam[][],
  flatten,
  map(values) as unknown as (m: PathsUrlMethod[]) => Parameters[][],
  values as (p: PathsUrl) => PathsUrlMethod[],
  prop('paths') as (s: TypeSchema) => PathsUrl,
);

const getComponentQueryParams: TypeGetQueryParam = compose(
  path(['components', 'parameters']) as (s: TypeSchema) => QueryParam[],
);

export const getQueryParams: TypeGetQueryParam = compose(
  flatten as (q: QueryParam[][]) => QueryParam[],
  juxt([getPathQueryParams, getComponentQueryParams]),
);
//TODO: check io-ts for this. Safe assertion
export const assertSchemaType = (schema: unknown) => <TypeSchema>schema;

export const isInQuery = compose(equals('query'), prop('in')) as (
  q: QueryParam,
) => boolean;
