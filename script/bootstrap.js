/*
 * node-frame: script/bootstrap.js
 *
 * Copyright (c) 2014, Stanislas Polu. All rights reserved.
 *
 * @author: spolu
 *
 * @log:
 * - 2014-07-18 spolu   Creation
 */
"use strict"

var async = require('async');
var mkdirp = require('mkdirp');
var path = require('path');
var fs = require('fs-extra');
var os = require('os');
var request = require('request');
var util = require('util');

var common = require('../lib/common.js');

/******************************************************************************/
/* CONFIGURATION                                                              */
/******************************************************************************/
var MODULE_PATH = path.join(__dirname, '..');
var VENDOR_PATH = path.join(MODULE_PATH, 'vendor');

var package_json = require(path.join(MODULE_PATH, 'package.json'));

var ATOM_SHELL_BASE_URL = package_json.ATOM_SHELL_BASE_URL;
var ATOM_SHELL_VERSION = package_json.ATOM_SHELL_VERSION;

var ATOM_SHELL_PATH = path.join(VENDOR_PATH, 'atom-shell');
var ATOM_SHELL_VERSION_PATH = path.join(ATOM_SHELL_PATH, '.version');

var ATOM_RELEASE_FILENAME = 'atom-shell-' + ATOM_SHELL_VERSION + '-' +
                            os.type().toLowerCase() + '-' + 
                            os.arch().toLowerCase() + '.zip';
var ATOM_RELEASE_URL = ATOM_SHELL_BASE_URL + 
                       ATOM_SHELL_VERSION + '/' + 
                       ATOM_RELEASE_FILENAME;

/******************************************************************************/
/* BOOTSTRAPPING STEPS                                                        */
/******************************************************************************/
// ### install_atom_shell
//
// Installs atom-shell binary distribution for the adequate platform if not 
// already present unless the force parameter is passed.
// ```
// @force {boolean} force install of atom-shell binary distribution
// ```
var install_atom_shell = function(force, cb_) {
  async.series([
    /* Clean if force flag */
    function(cb_) {
      if(force) {
        return fs.remove(ATOM_SHELL_PATH, cb_);
      }
      return cb_();
    },
    /* Check for the ATOM_SHELL_VERSION_PATH or remove it */
    function(cb_) {
      fs.readFile(ATOM_SHELL_VERSION_PATH, function(err, data) {
        if(err && err.code !== 'ENOENT') {
          return cb_(err);
        }
        else if(err && err.code === 'ENOENT') {
          fs.remove(ATOM_SHELL_PATH, cb_);
        }
        else {
          if(data.toString() === ATOM_SHELL_VERSION) {
            /* We're done here! */
            console.log('atom-shell-' + ATOM_SHELL_VERSION + 
                        ' already installed in ' + 
                        path.join(ATOM_SHELL_PATH));
            process.exit(0);
          }
          else {
            fs.remove(ATOM_SHELL_PATH, cb_);
          }
        }
      });
    },
    /* Create ATOM_SHELL_PATH */
    function(cb_) {
      console.log('Creating: ' + ATOM_SHELL_PATH);
      mkdirp(ATOM_SHELL_PATH, cb_);
    },
    /* Download ATOM_SHELL */
    function(cb_) {
      console.log('Downloading: ' + ATOM_RELEASE_URL);

      var itv = setInterval(function() {
        process.stdout.write('.');
      }, 1000);
      var finish = function(err) {
        clearInterval(itv);
        process.stdout.write('\n');
        return cb_(err);
      }

      request(ATOM_RELEASE_URL)
        .on('error', finish)
        .on('end', finish)
        .pipe(fs.createWriteStream(path.join(ATOM_SHELL_PATH, 
                                             ATOM_RELEASE_FILENAME)));
    },
    /* Extract atom-shell in ATOM_SHELL_PATH */
    function(cb_) {
      console.log('Extracting ' + path.join(ATOM_SHELL_PATH, 
                                            ATOM_RELEASE_FILENAME));
      var unzip = require('child_process').spawn('unzip', 
        [ '-oqq', path.join(ATOM_SHELL_PATH, ATOM_RELEASE_FILENAME) ], {
          cwd: ATOM_SHELL_PATH
        });
      unzip.stdout.on('data', function (data) {
        console.log('stdout: ' + data);
      });
      unzip.stderr.on('data', function (data) {
        console.log('stderr: ' + data);
      });
      unzip.on('close', function (code) {
        if(code !== 0) {
          return cb_(common.err('Extraction failed with code: ' + code,
                                'boostrap:failed_extraction'));
        }
        return cb_();
      });
    },
    /* Cleaning up */
    function(cb_) {
      console.log('Cleaning up ' + path.join(ATOM_SHELL_PATH, 
                                                ATOM_RELEASE_FILENAME));
      fs.remove(path.join(ATOM_SHELL_PATH, ATOM_RELEASE_FILENAME), cb_);
    },
    /* Create ATOM_SHELL_VERSION */
    function(cb_) {
      fs.writeFile(ATOM_SHELL_VERSION_PATH, ATOM_SHELL_VERSION, {
        flag: 'w'
      }, cb_);
    }
  ], cb_);
};


/******************************************************************************/
/* MAIN                                                                       */
/******************************************************************************/
(function() {
  var argv = require('optimist')
    .usage('Usage: $0 [-f]')
    .argv;

  async.series([
    function(cb_) {
      install_atom_shell(argv.f || false, cb_);
    }
  ], function(err) {
    if(err) {
      common.fatal(err);
    }
    process.exit(0);
  });
})();
