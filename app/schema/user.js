exports.schema = {
  $async: true,
  type: 'object',
  required: ['name', 'last_name', 'mail', 'pass'],
  properties: {
    name: {
      type: 'string'
    },
    last_name: {
      type: 'string'
    },
    mail: {
      type: 'string',
      format: 'woloxEmail',
      mailExists: { table: 'users' }
    },
    pass: {
      type: 'string',
      minLength: 8
    }
  },
  additionalProperties: false
};
