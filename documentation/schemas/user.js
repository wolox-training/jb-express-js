module.exports = {
  name: {
    type: 'string',
    example: 'Pepito'
  },
  last_name: {
    type: 'string',
    example: 'Perez'
  },
  mail: {
    type: 'string',
    example: 'pepito@wolox.com.ar',
    enum: ['...@wolox.com-ar', '...@wolox.co', '...@wolox.cl']
  },
  pass: {
    type: 'string',
    example: 'passPepit0'
  },
  User: {
    type: 'object',
    properties: {
      name: {
        $ref: '#/components/schemas/name'
      },
      last_name: {
        $ref: '#/components/schemas/last_name'
      },
      mail: {
        $ref: '#/components/schemas/mail'
      },
      pass: {
        $ref: '#/components/schemas/pass'
      }
    }
  },
  UserLogin: {
    type: 'object',
    properties: {
      mail: {
        $ref: '#/components/schemas/mail'
      },
      pass: {
        $ref: '#/components/schemas/pass'
      }
    }
  },
  Users: {
    type: 'object',
    properties: {
      users: {
        type: 'array',
        items: {
          $ref: '#/components/schemas/User'
        }
      }
    }
  }
};
