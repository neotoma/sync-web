/**
 * Configure Grunt scripts
 * @module
 */

require('dotenvs')();
var loadGruntTasks = require('load-grunt-tasks');

module.exports = function(grunt) {
  'use strict';

  grunt.initConfig({
    'deploy-files': {
      options: {
        destDir: process.env.SYNC_WEB_DEPLOY_DIR,
        destHost: process.env.SYNC_WEB_DEPLOY_USER + '@' + process.env.SYNC_WEB_DEPLOY_HOST,
        srcDir: __dirname
      },
      dist: {
        src: 'dist',
        dest: './'
      }
    }
  });

  loadGruntTasks(grunt);

  grunt.registerTask('deploy', 'Deploy dist directory to host.', [
    'deploy-files:dist',
  ]);
};