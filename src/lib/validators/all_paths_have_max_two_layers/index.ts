import { Validator } from '../intefaces';
import REGEX from '../../utils/regex';
const { R_THREE_BRACKETS_IN_PATH } = REGEX;

import { compose, keys, test, filter, path } from 'ramda';
import { makeResult } from '../utils';
import { assertSchemaType, TypeSchema } from '../utils/schema';

const hasThreeBracketsInPath = test(R_THREE_BRACKETS_IN_PATH);

const getInvalidPaths: (s: TypeSchema) => string[] = compose(
  filter(hasThreeBracketsInPath),
  keys,
  //TODO: why cannot use prop check
  path(['paths']),
);

const invalidPathsFormater = (InvalidPaths: string[]) =>
  `paths must cannot have more than two ids nested, \n ${InvalidPaths.join(
    ' \n ',
  )}`;
const makeResultWithCb = makeResult<string>(invalidPathsFormater);

//TODO: cannot point free with compose
const validator: Validator = (schema) =>
  compose(makeResultWithCb, getInvalidPaths, assertSchemaType)(schema);

validator.type = 'error';

export default validator;
