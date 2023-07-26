require('dotenv').config();
const express = require('express');
//const { AnxApi } = require('anx-api');
const axios = require('axios');
const fs = require('fs');
const csv = require('csv-parser');
const path = require('path');

const app = express();
const port = process.env.PORT || 3002;

const username = process.env.XANDR_USERNAME;
const password = process.env.XANDR_PASSWORD;

var AnxApi = require('anx-api').AnxApi;


// Create a new instance with api target
var anxApi = new AnxApi({
    target: 'https://api.appnexus.com',
    rateLimiting: true
});

anxApi.login(username, password).then((token) => {
    console.log('Authenticated successfully. The session token is', token);
    // Set the token for future requests
    anxApi.token = token;
    console.log('Authenticated successfully. The session token is saved here for the future', token);
    app.get('/fetch-report', (req, res) => {
        const reportRequestData = {
            
                "report": {
                    "report_type": "network_analytics",
                    "columns": [
                        "publisher_name",
                        "day",
                        "size",
                        "imps",
                        "view_rate",
                        "viewdef_view_rate"
                    ],
                    "filters": [
                        {
                            "publisher_id": "1000494"
                        }
                    ],
                    "format": "csv",
                    "orders": [
                        {
                            "order_by": "day",
                            "direction": "ASC"
                        }
                    ],
                    "timezone": "Europe/Berlin",
                    "start_date": "2023-07-24 00:00:00",
                "end_date": "2023-07-25 00:00:00"
                }
            
          };
          
          
        
        
        

        anxApi.post('report', reportRequestData)
            .then(reportResponse => {
                //console.log('This is response data from Xandr:', reportResponse);
                const reportId = reportResponse.body.response.report_id;
                console.log('Report ID:', reportId);

                //const reportUrl = `https://api.appnexus.com/report-download?id=${reportId}`;
                let intervalId = setInterval(() => {
                    console.log('Checking report status...');
                    anxApi.get(`report?id=${reportId}`).then(statusResponse => {
                        if (statusResponse.body.response.execution_status === "ready") {
                            console.log('Report ready,  downloading...');
                            clearInterval(intervalId);
        
                            // Download report
                            axios.get(`https://api.appnexus.com/report-download?id=${reportId}`, {
                                headers: {
                                    'Authorization': token // Use the token obtained from login
                                },
                                responseType: 'stream'
                            })
                            .then(response => {
                                const file = fs.createWriteStream(`./${reportId}.csv`); // Change file path and name as needed
                                response.data.pipe(file);
        
                                file.on('finish', () => {
                                    file.close();  // close() is async, call callback after close completes.
                                    console.log('Report downloaded successfully');
                                    res.send('Report downloaded successfully');
                                });
                            })
                            .catch(err => {
                                console.error(err);
                                res.status(500).send('Failed to download report');
                            });
                        }
                    });
                }, 60000); // Check status every 30 seconds, adjust as needed
            })
            .catch(err => {
                console.error(err);
                res.status(500).send('Failed to fetch report');
            });
    });

    app.listen(3000, () => {
        console.log('Server running on port 3000');
    });
});