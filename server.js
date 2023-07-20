require('dotenv').config();
const express = require('express');
var { AnxApi } = require('anx-api');

const app = express();
const port = 3000;

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

var anxApi = new AnxApi({
    target: 'https://api.appnexus.com',
    rateLimiting: true
});

app.get('/', async (req, res) => {
    anxApi.login(username, password).then((token) => {
        anxApi.token = token;
        anxApi.post('report', reportRequest)
        .then(response => {
            console.log(JSON.stringify(response, null, 2)); // print out the entire response object with pretty formatting
            const reportId = response.body.response.report_id;
            const interval = setInterval(() => {
                anxApi.get(`report?id=${reportId}`)
                .then(response => {
                    console.log(JSON.stringify(response, null, 2)); // print out the entire response object with pretty formatting
                    if (response.body.response.report.execution_status === "ready") {
                        clearInterval(interval);

                        anxApi.get(`report-download?id=${reportId}`)
                        .then(response => {
                            console.log(JSON.stringify(response.body, null, 2)); // print out the entire response object with pretty formatting
                        })
                        .catch(error => {
                            console.error(`Error: ${error}`);
                            console.log(JSON.stringify(error, null, 2));  // Additional logging
                        });
                    }
                })
                .catch(error => console.error(`Error: ${error}`));
            }, 5000);
        })
        .catch(error => console.error(`Error: ${error}`));
    })
    .catch(error => console.error(`Error: ${error}`));

    res.send('Report request sent!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
