export interface ResultValidator {
  result: boolean;
  //TODO: need an string array?
  info: string;
}
export interface Validator {
  type: 'warning' | 'error';
  (Schema: unknown): ResultValidator;
}
