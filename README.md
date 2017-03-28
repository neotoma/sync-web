# sync-web

[![Codeship badge](https://codeship.com/projects/9e06bd90-eadc-0134-d7cf-0e4301b0d4b6/status?branch=master)](https://app.codeship.com/projects/207842)
[![Code Climate](https://codeclimate.com/github/neotoma/sync-web/badges/gpa.svg)](https://codeclimate.com/github/neotoma/sync-web)
[![Code Climate issues badge](https://codeclimate.com/github/neotoma/sync-web/badges/issue_count.svg)](https://codeclimate.com/github/neotoma/sync-web/issues)
[![David badge](https://david-dm.org/neotoma/sync-web.svg)](https://david-dm.org/neotoma/sync-web)

This repository contains the source code for a web app that interfaces with [sync-server](https://github.com/neotoma/sync-server) to empower an individual to authorize his or her preferred storage and sources and manage data synchronization between them.

See also documentation for [the Neotoma project](https://github.com/neotoma/documentation).

## Setting up the environment

The code requires the following environment variables to run or deploy the app. They can be declared by adding a file named `.env` (in [INI format](https://en.wikipedia.org/wiki/INI_file)) to the base directory, assuming they're not declared elsewhere in the system already. Such a file will be ignored by Git.

- `SYNC_WEB_API_HOST`: Host address of sync-server (e.g. `127.0.0.1:9090`; required to run app).
- `SYNC_WEB_DEPLOY_API_HOST`: Host address of sync-server for deployed app (required to deploy app).
- `SYNC_WEB_DEPLOY_HOST`: Host for deployment (required to deploy app).
- `SYNC_WEB_DEPLOY_USER`: Host user for deployment (required to deploy app).
- `SYNC_WEB_DEPLOY_DIR`: Host directory for deployment (required to deploy app).

## Installation

Once the environment is ready per above, and [Node.js](http://nodejs.org/) with [NPM](https://www.npmjs.com/) is installed, simply run `npm install` to install dependencies.

## Developing, testing and deploying the app

The following commands can be executed for development and deployment:

- `npm run build`: Builds the app in the `dist` directory for development (i.e. code is not minified, among other things).
- `npm run build-prod`: Builds the app in the `dist` directory for production.
- `npm run deploy`: Builds the app for production and deploys it to a remote host.
- `npm run dev`: Builds the app and starts a web server for development. See output in the console for which address and port to use for testing.
- `npm run test`: Run tests.