import { boolean } from 'fp-ts';
import { Parser } from '../../utils/interfaces';

export interface ResultValidator {
  result: boolean;
  info: string[];
}
export interface Validator {
  type: 'warning' | 'error';
  (Schema: unknown): ResultValidator;
}
