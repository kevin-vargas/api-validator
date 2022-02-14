import Validator from '..';

describe('validators', () => {
  describe('all_paths_are_in_spinal_case', () => {
    it('should not valid', () => {
      const schemaToTest = {
        paths: {
          '/i-T/{id1}/{id2}/{id3}': {},
          '/i-T/{id1}/{id2}': {},
          '/i-T/{id1}/{id2}/a/b/{id3}/c/{id4}': {},
        },
      };
      const { result } = Validator(schemaToTest);
      expect(result).toBeFalsy();
    });
  });
});
