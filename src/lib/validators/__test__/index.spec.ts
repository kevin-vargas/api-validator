import { validateSchema } from '../../index';
import { either as E } from 'fp-ts';
import Example from './example';

describe('validators', () => {
  describe('valitors#OAS3', () => {
    it('should not valid', () => {
      const validation = validateSchema(Example);
      E.fold(
        (error) => {
          expect(error).toBeFalsy();
        },
        (schema) => expect(schema).toBeDefined(),
      )(validation);
    });
  });
});
