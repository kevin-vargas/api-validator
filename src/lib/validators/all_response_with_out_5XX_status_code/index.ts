import { Validator } from '../intefaces';
import REGEX from '../../utils/regex';
const { R_5XX_NUMBER } = REGEX;

import {
  compose,
  keys,
  test,
  filter,
  isEmpty,
  complement,
  values,
  path,
  map,
} from 'ramda';
import { makeResult } from '../utils';
import {
  assertSchemaType,
  getPathBy,
  Methods,
  StatusResponse,
  ResourceInfo,
} from '../utils/schema';
const isNotEmpty = complement(isEmpty);
const is5XX = test(R_5XX_NUMBER);

const has5XXinStatusResponse: (s: StatusResponse) => boolean = compose(
  //TODO: change to find?
  isNotEmpty,
  filter(is5XX),
  keys,
);
const getOnly5XX: (s: StatusResponse[]) => StatusResponse[] = filter(
  has5XXinStatusResponse,
);

const pathHas5XX: (m: Methods) => boolean = compose(
  isNotEmpty,
  getOnly5XX,
  map(path(['responses'])) as (p: ResourceInfo[]) => StatusResponse[],
  values as (m: Methods) => ResourceInfo[],
);

const invalidPathsFormater = (InvalidPaths: string[]) =>
  `status response must cannot 5XX errors, \n ${InvalidPaths.join(' \n ')}`;

const makeResultWithCb = makeResult<string>(invalidPathsFormater);

//TODO: cannot point free with compose
const validator: Validator = (schema) =>
  compose(
    makeResultWithCb,
    keys,
    getPathBy(pathHas5XX),
    assertSchemaType,
  )(schema);

validator.type = 'error';

export default validator;
