module.exports = {
  '/users': {
    get: {
      tags: ['CRUD operations'],
      description: 'Get users',
      operationId: 'getUsers',
      parameters: [
        {
          name: 'page',
          in: 'query',
          schema: {
            type: 'integer',
            default: 0
          },
          required: false
        },
        {
          name: 'size',
          in: 'query',
          schema: {
            type: 'integer',
            default: 10
          },
          required: false
        },
        {
          name: 'token',
          in: 'header',
          schema: {
            type: 'string'
          },
          required: true
        }
      ],
      responses: {
        200: {
          description: 'Users were obtained',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Users'
              }
            }
          }
        },
        401: {
          description: 'Authentication error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'jwt must be provided',
                internal_code: 'authentication_error'
              }
            }
          }
        }
      }
    },
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
        },
        401: {
          description: 'Authentication error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Password does not match, try again.',
                internal_code: 'authentication_error'
              }
            }
          }
        }
      }
    }
  },
  '/admin/users': {
    post: {
      tags: ['CRUD operations'],
      description: 'Create admin user',
      operationId: 'createAdminUser',
      parameters: [
        {
          name: 'token',
          in: 'header',
          schema: {
            type: 'string'
          },
          required: true
        }
      ],
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
        201: {
          description: 'New user was created with role admin'
        },
        200: {
          description: 'user.role was upadated'
        },
        400: {
          description: 'Invalid parameters',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'pass must NOT have fewer than 8 characters',
                internal_code: 'invalid_parameters'
              }
            }
          }
        },
        401: {
          description: 'Authentication error',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Invalid token',
                internal_code: 'authentication_error'
              }
            }
          }
        },
        403: {
          description: 'Forbidden',
          content: {
            'application/json': {
              schema: {
                $ref: '#/components/schemas/Error'
              },
              example: {
                message: 'Unauthorized user',
                internal_code: 'authorization_error'
              }
            }
          }
        }
      }
    }
  }
};
