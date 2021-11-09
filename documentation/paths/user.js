module.exports = {
  '/users': {
    post: {
      tags: ['CRUD operations'],
      description: 'Create user',
      operationId: 'createUser',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/User'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'New user was created'
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'User´s email already exists',
                internal_code: 'invalid_parameters'
              }
            }
          }
        }
      }
    }
  },
  '/users/sessions': {
    post: {
      tags: ['CRUD operations'],
      description: 'Sign In',
      operationId: 'signin',
      parameters: [],
      requestBody: {
        content: {
          'application/json': {
            schema: {
              $ref: '#/components/schemas/UserLogin'
            }
          }
        },
        required: true
      },
      responses: {
        200: {
          description: 'Token was generated'
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'User´s email not exists',
                internal_code: 'invalid_parameters'
              }
            }
          }
        }
      }
    }
  }
};
