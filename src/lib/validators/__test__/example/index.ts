export default {
  openapi: '3.0.0',
  servers: [
    {
      description: 'Server description in case you need to specify it',
      url: 'https://swaggerhub.ar.bsch/swagger-example-api',
    },
  ],
  info: {
    version: '1.0.0',
    title: 'swagger-example-api',
    description:
      '<p>\nThis is an example of how to create a swagger document according to the standards.\n</p>\n<hr>\n<p>\nIf you need further details on how to proceed in some case you can read more in the <a href="https://confluence.ar.bsch/display/ASA/API+Dev+Agreement">API dev agreement</a>.\n<br>\nFor any other topic not covered in the API dev agreement reach out for the api governance team in slack over the channel <a href="https://santander-tecno-ar.slack.com/archives/CTV694B6J">#api-governance</a>.\n</p>\n<hr>\n<p>\nThe versioning mechanism that we use is semantic version and can be found in our <a href="https://confluence.ar.bsch/display/ASA/API+Dev+Agreement#APIDevAgreement-VersionadoyContextos">API dev agreement</a> or in this link <a href="https://semver.org/">semantic version</a>.\n</p>\n<hr>\n<p>\nIn this section should go the description of what your api does as an overview and how to consume it if there is any special consideration that cannot be inferred easily.\n</p>\n<hr>\n<h3>Details can be things like</h3>\n<ul>\n  <li>The endpoint x has to be consumed after the endpoint y.</li>\n  <li>Some endpoint always filters by a criteria despite the request.</li>\n  <li>Any important point to consider when consuming a specific endpoint.</li>\n</ul>\n<hr>\n',
    contact: {
      name: 'Some contact name',
      email: 'my.contact@email.com',
    },
    license: {
      name: 'Apache 2.0',
      url: 'http://www.apache.org/licenses/LICENSE-2.0.html',
    },
  },
  tags: [
    {
      name: 'Products',
      description: 'Products management',
    },
    {
      name: 'Product Types',
      description: 'Product types management',
    },
  ],
  security: [
    {
      bearerAuth: [],
    },
  ],
  paths: {
    '/products': {
      get: {
        tags: ['Products'],
        summary: 'Return all products matching the filter criteria.\n',
        description:
          'By using this endpoint you can get all the products that match a certain criteria.\n',
        parameters: [
          {
            $ref: '#/components/parameters/releaseDateFrom',
          },
          {
            $ref: '#/components/parameters/releaseDateTo',
          },
          {
            $ref: '#/components/parameters/includeWithoutStock',
          },
          {
            $ref: '#/components/parameters/offset',
          },
          {
            $ref: '#/components/parameters/limit',
          },
        ],
        responses: {
          '200': {
            description: 'Return products that match the given criteria.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Products',
                },
              },
            },
          },
          '400': {
            description:
              'Some of the parameters provided are incorrect, please review them and retry.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          default: {
            description: 'Generic Error',
            content: {
              'application/json': {
                schema: {
                  items: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Products'],
        summary: 'Create a new Product.\n',
        description:
          'Creates a new product and returns the id in case of success.\n',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
          description: 'Product to be added.\n',
        },
        responses: {
          '201': {
            description:
              'Product successfully created. Returns the Id of the recently created product.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Uuid',
                },
              },
            },
          },
          '400': {
            description:
              'Some of the parameters provided are incorrect. User should review them and retry.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '409': {
            description:
              'A product with same data already exists. User should review the provided data.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          default: {
            description: 'Generic Error',
            content: {
              'application/json': {
                schema: {
                  items: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/products/{id}': {
      get: {
        tags: ['Products'],
        summary: 'Return the product matching the route id provided.\n',
        description:
          'By using this endpoint you can get a specific product by a given identity value.\n',
        parameters: [
          {
            $ref: '#/components/parameters/uuidInPath',
          },
        ],
        responses: {
          '200': {
            description: 'Return the product that has the given id.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          '400': {
            description:
              'Some of the parameters provided are incorrect, please review them and retry.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'The product for the given id could not be found.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          default: {
            description: 'Generic Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      patch: {
        tags: ['Products'],
        summary: 'Partially updates a given product.\n',
        description:
          'By using this endpoint you can partially update a specific product by a given identity value.\n<br>\nThe values that will be updated here are <b>only the Product level</b> (not any objects within it).\n<br>\nTake in mind that this will update only the provided parameters of product except for id and other object values.\n',
        parameters: [
          {
            $ref: '#/components/parameters/uuidInPath',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Product',
              },
            },
          },
          description: 'Product to be partially updated.\n',
        },
        responses: {
          '200': {
            description: 'Return the updated product.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
          '400': {
            description:
              'Some of the parameters provided are incorrect, please review them and retry.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'The product for the given id could not be found.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          default: {
            description: 'Generic Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Products'],
        summary: 'Delete the product matching the route id provided.\n',
        description:
          'By using this endpoint you can delete a specific product by a given identity value.\n<br>\n<b>IMPORTANT! This operation cannot be undone.</b>\n',
        parameters: [
          {
            $ref: '#/components/parameters/uuidInPath',
          },
        ],
        responses: {
          '204': {
            description: 'The product has been successfully deleted.\n',
          },
          '400': {
            description:
              'Some of the parameters provided are incorrect, please review them and retry.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description: 'The product for the given id could not be found.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          default: {
            description: 'Generic Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
    '/product-types': {
      get: {
        tags: ['Product Types'],
        summary: 'Return all product types.\n',
        description:
          'By using this endpoint you can get all the product types using pagination.\n',
        parameters: [
          {
            $ref: '#/components/parameters/offset',
          },
          {
            $ref: '#/components/parameters/limit',
          },
        ],
        responses: {
          '200': {
            description: 'Return product types.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ProductTypes',
                },
              },
            },
          },
          '400': {
            description:
              'Some of the parameters provided are incorrect, please review them and retry.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          default: {
            description: 'Generic Error',
            content: {
              'application/json': {
                schema: {
                  items: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
      post: {
        tags: ['Product Types'],
        summary: 'Create a new Product Type.\n',
        description:
          'Creates a new product type and returns the id in case of success.\n',
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductType',
              },
            },
          },
          description: 'Product type to be added.\n',
        },
        responses: {
          '201': {
            description:
              'Product type successfully created. Returns the Id of the recently created product type.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/Uuid',
                },
              },
            },
          },
          '400': {
            description:
              'Some of the parameters provided are incorrect. User should review them and retry.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '409': {
            description:
              'A product type with same data already exists. User should review the provided data.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          default: {
            description: 'Generic Error',
            content: {
              'application/json': {
                schema: {
                  items: {
                    $ref: '#/components/schemas/ErrorResponse',
                  },
                },
              },
            },
          },
        },
      },
    },
    '/product-types/{id}': {
      get: {
        tags: ['Product Types'],
        summary: 'Return the product type matching the route id provided.\n',
        description:
          'By using this endpoint you can get a specific product type by a given identity value.\n',
        parameters: [
          {
            $ref: '#/components/parameters/uuidInPath',
          },
        ],
        responses: {
          '200': {
            description: 'Return the product type that has the given id.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ProductType',
                },
              },
            },
          },
          '400': {
            description:
              'Some of the parameters provided are incorrect, please review them and retry.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description:
              'The product type for the given id could not be found.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          default: {
            description: 'Generic Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      put: {
        tags: ['Product Types'],
        summary: 'Updates a given product type.\n',
        description:
          'By using this endpoint you can update a specific product type by a given identity value.\n<br>\nThe values that will be updated here are <b>only the product type level</b> (not any objects within it).\n<br>\nTake in mind that this will update the entire product except for id and other object values.\n',
        parameters: [
          {
            $ref: '#/components/parameters/uuidInPath',
          },
        ],
        requestBody: {
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/ProductType',
              },
            },
          },
          description: 'Product type to update.\n',
        },
        responses: {
          '200': {
            description: 'Return the updated product type.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ProductType',
                },
              },
            },
          },
          '400': {
            description:
              'Some of the parameters provided are incorrect, please review them and retry.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description:
              'The product type for the given id could not be found.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          default: {
            description: 'Generic Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
      delete: {
        tags: ['Product Types'],
        summary: 'Delete the product type matching the route id provided.\n',
        description:
          'By using this endpoint you can delete a specific product type by a given identity value.\n<br>\n<b>IMPORTANT! This operation cannot be undone.</b>\n',
        parameters: [
          {
            $ref: '#/components/parameters/uuidInPath',
          },
        ],
        responses: {
          '204': {
            description: 'The product type has been successfully deleted.\n',
          },
          '400': {
            description:
              'Some of the parameters provided are incorrect, please review them and retry.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          '404': {
            description:
              'The product type for the given id could not be found.\n',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
          default: {
            description: 'Generic Error',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/ErrorResponse',
                },
              },
            },
          },
        },
      },
    },
  },
  components: {
    parameters: {
      offset: {
        in: 'query',
        name: 'offset',
        description:
          'The number of items to skip before starting to collect the result set.\n<br>\nIf not specified, 0 is assumed.\n',
        required: false,
        schema: {
          type: 'integer',
          format: 'int32',
          default: 0,
          example: 0,
          minimum: 0,
          maximum: 100,
        },
      },
      limit: {
        in: 'query',
        name: 'limit',
        description:
          'Maximum number of records to return per page.\n<br>\nIf not specified, limit 200 is assumed.\n',
        required: false,
        schema: {
          type: 'integer',
          format: 'int32',
          default: 200,
          example: 200,
          minimum: 10,
          maximum: 1000,
        },
      },
      releaseDateFrom: {
        in: 'query',
        name: 'release_date_from',
        description:
          'The minimum date from where the product should have been released.\n',
        required: false,
        schema: {
          type: 'string',
          format: 'date-time',
          example: '2019-10-12T07:20:50.52Z',
        },
      },
      releaseDateTo: {
        in: 'query',
        name: 'release_date_to',
        description:
          'The maximum date up to where the product should have been released\n',
        required: false,
        schema: {
          type: 'string',
          format: 'date-time',
          example: '2019-10-12T07:20:50.52Z',
        },
      },
      includeWithoutStock: {
        in: 'query',
        name: 'include_without_stock',
        description:
          'Set to true in order to include the products that do not have stock.\n<br>\n<b>If <u>NOT</u> specified, products without stock are <u>excluded from results</u></b>.\n',
        schema: {
          type: 'boolean',
          default: false,
          example: false,
        },
      },
      uuidInPath: {
        in: 'path',
        name: 'id',
        description: 'Id to look for.\n',
        required: true,
        schema: {
          type: 'string',
          format: 'uuid',
          example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
        },
      },
    },
    schemas: {
      PaginatedObject: {
        type: 'object',
        properties: {
          total: {
            type: 'integer',
            example: 1000,
            description: 'Total number of records found.\n',
          },
          offset: {
            type: 'integer',
            example: 1,
            description: 'The current page in the pagination.\n',
          },
          limit: {
            type: 'integer',
            example: 200,
            description: 'Maximum number of records returned in each page.\n',
          },
        },
      },
      Products: {
        allOf: [
          {
            $ref: '#/components/schemas/PaginatedObject',
          },
          {
            type: 'object',
            properties: {
              results: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/Product',
                },
              },
            },
          },
        ],
      },
      Product: {
        type: 'object',
        required: ['id', 'name', 'type', 'stock', 'releaseDate'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
          },
          name: {
            type: 'string',
            example: 'Keyboard',
          },
          type: {
            $ref: '#/components/schemas/ProductType',
          },
          stock: {
            type: 'integer',
            example: 15,
          },
          releaseDate: {
            type: 'string',
            format: 'date-time',
            example: '2019-10-12T07:20:50.52Z',
          },
        },
      },
      ProductTypes: {
        allOf: [
          {
            $ref: '#/components/schemas/PaginatedObject',
          },
          {
            type: 'object',
            properties: {
              results: {
                type: 'array',
                items: {
                  $ref: '#/components/schemas/ProductType',
                },
              },
            },
          },
        ],
      },
      ProductType: {
        type: 'object',
        required: ['id', 'name', 'category'],
        properties: {
          id: {
            type: 'string',
            format: 'uuid',
            example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
          },
          name: {
            type: 'string',
            example: 'Device',
          },
          category: {
            $ref: '#/components/schemas/ProductTypeCategory',
          },
        },
      },
      Error: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            example: 'validation.error.field.valueofenum',
          },
          message: {
            type: 'string',
            example: 'concept type not valid',
          },
        },
      },
      ErrorResponse: {
        type: 'object',
        properties: {
          code: {
            type: 'string',
            example: 'BAD_REQUEST',
            description: 'Functional response code.\n',
          },
          message: {
            type: 'string',
            example: 'Validation error',
            description:
              'Message that describes the detail or result of the operation carried out.\n',
          },
          errors: {
            type: 'array',
            description: 'Detail of all the error logs found\n',
            items: {
              $ref: '#/components/schemas/Error',
            },
          },
        },
        description: 'Object for error responses.',
      },
      Uuid: {
        description: 'Id represented as uuid.\n',
        type: 'string',
        format: 'uuid',
        example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
      },
      ProductTypeCategory: {
        type: 'string',
        description: 'The category associated to a product type.\n',
        enum: ['HARDWARE', 'MOBILE_DEVICE', 'LAPTOP', 'MACBOOK'],
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
      },
    },
  },
};
