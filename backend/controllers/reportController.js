/* eslint-disable no-unused-vars */
const axios = require('axios');
const fs = require('fs');

const env = process.env.NODE_ENV || 'development'; // Get current environment
// eslint-disable-next-line import/order
const config = require('../config/config')[env]; // Import the correct environment config
const { AnxApi } = require('anx-api');
const csvtojson = require('csvtojson');

const anxApi = new AnxApi({
  target: config.xandr.apiUrl,
  rateLimiting: true,
});

// Authenticate with xandr controller.
const authenticate = (req, res) => {
  anxApi.login(req.body.username, req.body.password).then((token) => {
    anxApi.token = token;
    res.status(200).json({ message: 'Authenticated successfully', token });
  }).catch((err) => {
    console.error(err);
    res.status(500).json({ message: 'Authentication failed', error: err });
  });
};

// get report from xandr controller.
const getReport = (req, res) => {
  const reportRequestData = {
    report: {
      report_type: 'network_analytics',
      columns: ['publisher_id', 'publisher_name', 'day', 'size', 'imps', 'view_rate', 'viewdef_view_rate'],
      filters: [{ publisher_id: '1000494' }],
      format: 'csv',
      orders: [{ order_by: 'day', direction: 'ASC' }],
      timezone: 'Europe/Berlin',
      start_date: '2023-07-24 00:00:00',
      end_date: '2023-07-25 00:00:00',
    },
  };

  anxApi.post('report', reportRequestData)
    .then((reportResponse) => {
      const reportId = reportResponse.body.response.report_id;

      const intervalId = setInterval(() => {
        anxApi.get(`report?id=${reportId}`).then((statusResponse) => {
          if (statusResponse.body.response.execution_status === 'ready') {
            clearInterval(intervalId);
            axios.get(`https://api.appnexus.com/report-download?id=${reportId}`, {
              headers: { Authorization: req.token }, // use the token from the req object
              responseType: 'stream',
            })
              .then((response) => {
                const csvStream = response.data;
                const jsonObjects = [];
                csvStream.pipe(csvtojson())
                  .on('data', (jsonObj) => jsonObjects.push(JSON.parse(jsonObj)))
                  .on('end', () => res.json(jsonObjects))
                  .on('error', (err) => {
                    console.error(err);
                    res.status(500).send('Failed to convert CSV to JSON');
                  });
              })
              .catch((err) => {
                console.error(err);
                res.status(500).send('Failed to download report');
              });
          }
        });
      }, 60000);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send('Failed to fetch report');
    });
};

module.exports = { authenticate, getReport };
