import { Validator } from '../intefaces';
import REGEX from '../../utils/regex';
const { R_PATH_SPINAL_CASE } = REGEX;

import { compose, prop, keys, test, filter, complement } from 'ramda';
import { makeResult } from '../utils';

type schemaType = Record<'paths', unknown>;

const isPathSpinalCase = test(R_PATH_SPINAL_CASE);
const isNotPathSpinalCase = complement(isPathSpinalCase);
const getInvalidPaths = compose(
  filter(isNotPathSpinalCase),
  keys,
  prop('paths'),
);
//TODO: improve with io-ts type validation
const assertType = (schema: unknown) => <schemaType>schema;
const invalidPathsFormater = (InvalidPaths: string[]) =>
  `paths must be in spinalCase, ${InvalidPaths.join(' \n ')}`;
const makeResultWithCb = makeResult<string>(invalidPathsFormater);

//TODO: cannot point free with compose
const validator: Validator = (schema) =>
  compose(makeResultWithCb, getInvalidPaths, assertType)(schema);

validator.type = 'error';

export default validator;
