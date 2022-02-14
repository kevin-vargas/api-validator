import Validator from '..';

describe('validators', () => {
  describe('all_paths_are_in_spinal_case', () => {
    it('should not valid', () => {
      const schemaToTest = {
        paths: {
          '/i-T': {},
        },
      };
      const { result } = Validator(schemaToTest);
      expect(result).toBeFalsy();
    });

    it('should be valid', () => {
      const schemaToTest = {
        paths: {
          '/tests': {},
          '/tests/{id}': {},
          '/tests-tests/{id}': {},
        },
      };
      const { result } = Validator(schemaToTest);
      expect(result).toBeTruthy();
    });
  });
});
