require('dotenv').config();

module.exports = {
  development: { 
    xandr: {
      username: process.env.XANDR_USERNAME,
      password: process.env.XANDR_PASSWORD,
      apiUrl: 'https://api.appnexus.com',
    },
    app: {
      port: process.env.DEV_PORT || 5000,
    }
  },
  test: { 
    xandr: {
      username: process.env.TEST_XANDR_USERNAME,
      password: process.env.TEST_XANDR_PASSWORD,
      apiUrl: 'https://api.appnexus.com',
    },
    app: {
      port: process.env.TEST_PORT || 3001,
    }
  },
  production: { 
    xandr: {
      username: process.env.PROD_XANDR_USERNAME,
      password: process.env.PROD_XANDR_PASSWORD,
      apiUrl: 'https://api.appnexus.com',
    },
    app: {
      port: process.env.PROD_PORT || 3002,
    }
  }
};
