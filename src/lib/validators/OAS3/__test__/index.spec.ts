import OAS3 from '../';

describe('validators', () => {
  describe('valitors#OAS3', () => {
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
      const { result } = OAS3(schemaToTest);
      expect(result).toBeFalsy();
    });
  });
});
