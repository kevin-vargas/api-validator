import Validator from '..';

describe('validators', () => {
  describe('all_response_with_out_5XX_status_code', () => {
    it('should not valid', () => {
      const schemaToTest = {
        paths: {
          '/i-T/{id1}/{id2}/{id3}': {
            get: {
              responses: {
                '200': {},
              },
            },
          },
          '/i-T/{id1}/{id2}': {
            post: {
              responses: {
                '404': {},
              },
            },
          },
          '/i-T/{id1}/{id2}/a/b/{id3}/c/{id4}': {
            get: {
              responses: {
                '404': {},
                '500': {},
              },
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
          '/i-T/{id1}/{id2}/{id3}': {
            get: {
              responses: {
                '200': {},
              },
            },
          },
        },
      };
      const { result } = Validator(schemaToTest);
      expect(result).toBeTruthy();
    });
  });
});
