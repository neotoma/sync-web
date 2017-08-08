/* jshint node: true */

require('dotenvs')();

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'sync-web',
    environment: environment,
    baseURL: '/',
    locationType: 'auto',
    EmberENV: {
      EXTEND_PROTOTYPES: {
        Array: true,
        Date: false,
        String: true,
        Function: true
      },
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },
    segment: {
      WRITE_KEY: process.env.SYNC_WEB_SEGMENT_WRITE_KEY
    },
    transitionDelay: 500,

    APP: {}
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
    ENV.EmberENV.API_HOST = process.env.SYNC_WEB_API_HOST;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.EmberENV.API_HOST = process.env.SYNC_WEB_DEPLOY_API_HOST;
  }

  return ENV;
};