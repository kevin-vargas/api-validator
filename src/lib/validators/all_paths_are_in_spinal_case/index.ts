import { Validator, ResultValidator } from '../intefaces';
import REGEX from '../../utils/regex';
const { R_PATH_SPINAL_CASE } = REGEX;

import { compose, prop, keys, test, filter, complement } from 'ramda';

type schemaType = Record<'paths', unknown>;

const isPathSpinalCase = test(R_PATH_SPINAL_CASE);
const isNotPathSpinalCase = complement(isPathSpinalCase);

const getInvalidPaths = compose(
  filter(isNotPathSpinalCase),
  keys,
  prop('paths'),
);
const assertType = (schema: unknown) => <schemaType>schema;

const makeResult: (paths: string[]) => ResultValidator = (paths) => ({
  result: paths.length === 0,
  info: paths,
});

const validator: Validator = (schema) =>
  makeResult(getInvalidPaths(assertType(schema)));

//const validator: Validator = compose(makeResult, getInvalidPaths, assertType)

validator.type = 'error';

export default validator;
