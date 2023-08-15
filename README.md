# xandr-report-tool

This repository contains a Node.js application designed to interact with the Xandr API. The tool fetches and displays viewability reports for specified publishers and ad slots. It's built for internal use to aid in analyzing ad performance data and is expected to evolve over time as we understand more about our reporting needs. This project is part of an ongoing effort to automate and enhance our advertising analytics capabilities...

## CI / CD

### Pipeline Sketch
+-------------+     +-------------+    +-------------+    +-------------+
|             |     |             |    |             |    |             |
| Local Dev   +----->  GitHub     +---->   CI Server +---->  CD Server |
|             |     |             |    |             |    |             |
+-------------+     +-------------+    +-------------+    +-------------+
       |                   |                  |                  |
       |                   |                  |                  |
  Code/Debug         Version Control   Build/Tests         Deployment



* Local Development: This stage initiates on your personal computer, where you create and initially test your code.
* GitHub (Version Control System): Following the successful local development and testing, your code is then committed and pushed to GitHub, which serves as our version control system. In addition to the code, associated materials such as documentation, images, or configuration files that exist in your repository also get transferred to GitHub.
* Continuous Integration (CI) Server: Each time a new commit is made to GitHub, it triggers our CI server. This server automatically fetches the most recent code along with any associated materials. The CI server then executes a series of automated tests on this code.
* Continuous Deployment (CD) Server: Upon the successful build of the project and passing of all tests by the CI server, the CD server steps in. It retrieves the code and any needed materials either directly from GitHub or the CI server. The code then gets deployed to a staging environment for further testing, and upon successful validation, it's deployed to the production environment.

## Prerequisites

Node.js & npm
A Xandr account with API access
Environment Configuration

In order to run this application, you need to set up the following environment variables in the config file:

XANDR_API_URL: This is the URL for the Xandr API. Typically, it is https://api.appnexus.com/.
XANDR_USERNAME: The username for your Xandr account.
XANDR_PASSWORD: The password for your Xandr account.

The config file is structured as follows:

`module.exports = {
  development: {
    xandr: {
      apiUrl: process.env.XANDR_API_URL,
      username: process.env.XANDR_USERNAME,
      password: process.env.XANDR_PASSWORD
    }
  }
  //...
}
`
To run the project in different environments (like development, production, etc.), create similar blocks and use the NODE_ENV variable to switch between them.

## Running the Project

To run the project, follow these steps:

Clone the repository.
Install the dependencies:

`npm install
`
Set your environment variables. This can typically be done in a .env file or directly in your shell.
Run the project:

`npm start
`
This will start the application. By default, it will be accessible at http://localhost:3000 (or the port specified in your environment configuration).

## Project Structure

The main components of this application are the authenticate and getReport functions, which authenticate the user with the Xandr API and fetch the requested report data, respectively.

This application makes use of several libraries:

axios is used for making HTTP requests.
anx-api is a helper library for interacting with the Xandr API.
csvtojson is used to convert CSV data retrieved from the API into JSON for easier manipulation.

## Troubleshooting

If you're encountering a TypeError: Failed to fetch error, please check the following:

Is your CORS policy properly configured on the server?
Is the URL you're fetching from correct and accessible?
Are there any network connectivity issues?
Ensure your environment variables are correctly set and that the server is up and running.

## Contributions

Contributions to this project are welcome. Please create a fork of the repository, make your changes, and submit a pull request.

## License

This project is licensed under the MIT License.

## imperative, functional, logic, and object oriented.