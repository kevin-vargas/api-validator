import all_query_params_are_in_snake_case from './validators/all_query_params_are_in_snake_case';
import all_response_with_out_5XX_status_code from './validators/all_response_with_out_5XX_status_code';
import all_paths_have_max_two_layers from './validators/all_paths_have_max_two_layers';
import all_paths_are_in_spinal_case from './validators/all_paths_are_in_spinal_case';
import oas3 from './validators/oas3';
import { Validator } from './validators/intefaces';
import { Either, left, right, chain } from 'fp-ts/lib/Either';
import { pipe } from 'ramda';

type TypeMakeValidator = (
  v: Validator,
) => (s: unknown) => Either<string, unknown>;

const makeValidatorEither: TypeMakeValidator = (validator) => (schema) => {
  const { result, info } = validator(schema);
  return result ? right(schema) : left(info);
};

// const arrayValidators = [oas3, all_paths_are_in_spinal_case, all_paths_have_max_two_layers, all_response_with_out_5XX_status_code, all_query_params_are_in_snake_case]

export const validateSchema = pipe(
  makeValidatorEither(oas3),
  chain(makeValidatorEither(all_paths_are_in_spinal_case)),
  chain(makeValidatorEither(all_paths_have_max_two_layers)),
  chain(makeValidatorEither(all_response_with_out_5XX_status_code)),
  chain(makeValidatorEither(all_query_params_are_in_snake_case)),
);
