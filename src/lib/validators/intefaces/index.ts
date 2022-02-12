export interface Validator {
  (Schema: unknown): boolean;
}
