import {
  prop,
  compose,
  keys,
  all,
  binary,
  length,
  gt,
  flip,
  when,
  curry,
  tap,
  test,
  complement,
  filter,
  path,
  juxt,
  flatten,
  values,
  map,
  reject,
  isNil,
  equals,
} from 'ramda';
import { Validator } from '../intefaces';
import REGEX from '../../utils/regex';
const { R_SNAKE_CASE } = REGEX;
import { makeResult } from '../utils';
import { getQueryParams, assertSchemaType, QueryParam } from '../utils/schema';

const isSnakeCase = test(R_SNAKE_CASE);
const isNotSnakeCase = complement(isSnakeCase);
const invalidQueryParamsFormater = (params: string[]) =>
  `query params must be in snake_case: ${params.join(',')}`;
const makeResultWithCb = makeResult<string>(invalidQueryParamsFormater);

const isInQuery = compose(equals('query'), prop('in')) as (
  q: QueryParam,
) => boolean;

//TODO: point free why i cannot use it
const all_query_params_are_in_snake_case: Validator = (schema) =>
  compose(
    makeResultWithCb,
    filter(isNotSnakeCase),
    map(prop('name')),
    filter(isInQuery) as (q: QueryParam[]) => QueryParam[],
    getQueryParams,
    assertSchemaType,
  )(schema);

all_query_params_are_in_snake_case.type = 'error';

export default all_query_params_are_in_snake_case;
