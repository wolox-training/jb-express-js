const axios = require('axios');
const logger = require('../logger');
const config = require('../../config');

const geekJokes = async () => {
  try {
    return await axios({
      method: 'get',
      url: config.geekJokes.url,
      params: {
        format: 'json'
      }
    }).data;
  } catch (e) {
    logger.info(e);
    return Promise.reject(e);
  }
};

module.exports = { geekJokes };
