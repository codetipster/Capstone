require('dotenv').config();
const express = require('express');
const { AnxApi } = require('anx-api');
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3000;

const username = process.env.XANDR_USERNAME;
const password = process.env.XANDR_PASSWORD;


const reportRequest = {
    report: {
        report_type: "network_analytics",
        columns: ["view_rate"],
        dimensions: ["publisher", "size"],
        report_interval: "yesterday",
        format: "csv"
    }
};


const anxApi = new AnxApi({
    target: 'https://api.appnexus.com',
    rateLimiting: true
});

const getReport = async (url, token) => {
  try {
    return await axios({
      method: 'get',
      url: url,
      responseType: 'stream',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
  } catch (error) {
    if (error.response && error.response.status === 401) {
      const newToken = await anxApi.login(username, password);
      anxApi.token = newToken;
      return await getReport(url, newToken);
    }
    throw error;
  }
};

app.get('/', async (req, res) => {
    try {
        const token = await anxApi.login(username, password);
        anxApi.token = token;
        console.log(`Logged in with token: ${token}`);
        const reportResponse = await anxApi.post('report', reportRequest);

        console.log("Report request response: ", JSON.stringify(reportResponse, null, 2)); 
        const reportId = reportResponse.body.response.report_id;
        console.log(`Report ID: ${reportId}`);

        let reportStatus;
        do {
            reportStatus = await anxApi.get(`report?id=${reportId}`);
            console.log("Report status response: ", JSON.stringify(reportStatus, null, 2));
            await new Promise(resolve => setTimeout(resolve, 5000));
        } while (reportStatus.body.response.report.execution_status !== "ready");

        console.log('The report is ready. Starting the download.');

        const downloadResponse = await getReport(`https://api.appnexus.com/report-download?id=${reportId}`, anxApi.token);
        
        console.log('The report has been downloaded.');
        const output = fs.createWriteStream(path.resolve(__dirname, 'report.csv'));
        downloadResponse.data.pipe(output);
        await new Promise((resolve, reject) => {
            output.on('finish', resolve);
            output.on('error', reject);
        });

        console.log('The report has been saved.');
        const results = [];
        fs.createReadStream(path.resolve(__dirname, 'report.csv'))
            .pipe(csv())
            .on('data', (data) => results.push(data))
            .on('end', () => {
                console.log(results);
            });

        res.send('Report request sent and processed!');
    } catch (error) {
        console.error(`An error occurred: ${error}`);
        console.log("Error details: ", JSON.stringify(error, null, 2));
        res.status(500).send('An error occurred while processing the request.');
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});





const getAuthToken = async () => {
    console.log("username: ", username);
    console.log("password: ", password);

    try {
      const response = await axios.post('https://api.adnxs.com/auth', {
        auth: {
          "username": username,
          "password": password
        }
      });
      console.log("response.data.token: ", response.data.token)
      return response.data.token;  // Adjust this according to the API response structure
    
    } catch (error) {
      console.error("Failed to get auth token:", error);
      return null;
    }
  };



  const initializeXandrApi = async () => {
    const authToken = await getAuthToken();
    if (!authToken) {
      console.error("Failed to initialize Xandr API due to auth failure.");
      return null;
    }
  
    return axios.create({
      baseURL: 'https://api.appnexus.com',
      headers: {
        'Authorization': 'Bearer ' + authToken
      }
    });
  };


  // Usage:
initializeXandrApi().then((xandrApi) => {
    console.log("xandrApi: ", xandrApi);
    // Now you can use xandrApi to make requests
    // If auth failed, xandrApi will be null
  });





  // Authenticate with your username and password
anxApi.login(username, password).then(function (token) {
    console.log('Authenticated successfully. The session token is', token);

    // Now you can make requests, e.g., to get some data:
    
}).catch(function (err) {
    console.log('Error during authentication:', err);
});