import Validator from '..';

describe('validators', () => {
  describe('all_paths_are_in_spinal_case', () => {
    it('should not valid', () => {
      const schemaToTest = {
        paths: {
          '/i-T': {
            get: {
              parameters: [
                {
                  in: 'query',
                  name: 'release_date_fromT',
                },
                {
                  in: 'query',
                  name: 'release_date_toT',
                },
              ],
            },
          },
        },
      };
      const { result } = Validator(schemaToTest);
      expect(result).toBeFalsy();
    });
  });
});
