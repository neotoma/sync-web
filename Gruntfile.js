/**
 * Configure Grunt scripts
 * @module
 */

require('dotenvs')();
var loadGruntTasks = require('load-grunt-tasks');

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    deployFiles: {
      options: {
        destDir: process.env.SYNC_WEB_DEPLOY_DIR,
        destHost: process.env.SYNC_WEB_DEPLOY_USER + '@' + process.env.SYNC_WEB_DEPLOY_HOST,
        srcDir: __dirname
      }
    }
  });

  loadGruntTasks(grunt);

  grunt.registerTask('deploy', 'Deploy server to host', [
    'deploy-files:dist:./',
  ]);
};