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
          '/i-X': {
            post: {
              parameters: [
                {
                  in: 'query',
                  name: 'release_date_fromX',
                },
                {
                  in: 'query',
                  name: 'release_date_toX',
                },
              ],
            },
          },
          '/i-D': {},
        },
        components: {
          parameters: {
            offset: {
              in: 'query',
              name: 'offset',
            },
            limit: {
              in: 'query',
              name: 'limit_',
            },
          },
        },
      };

      const { result } = Validator(schemaToTest);
      expect(result).toBeFalsy();
    });

    it('should be valid', () => {
      const schemaToTest = {
        paths: {
          '/i-T': {
            get: {
              parameters: [
                {
                  in: 'query',
                  name: 'release_date_from',
                },
                {
                  in: 'query',
                  name: 'release_date_to',
                },
              ],
            },
          },
        },
        components: {
          parameters: {
            offset: {
              in: 'query',
              name: 'offset',
            },
            limit: {
              in: 'query',
              name: 'limit',
            },
          },
        },
      };

      const { result } = Validator(schemaToTest);
      expect(result).toBeTruthy();
    });
  });
});
