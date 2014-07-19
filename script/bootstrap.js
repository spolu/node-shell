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
/* CONFIGURATION */
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

var WRAPPER_PATH = path.join(MODULE_PATH, 'wrapper');

/******************************************************************************/
/* BOOTSTRAPPING STEPS */
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
            return cb_(common.err('atom-shell-' + ATOM_SHELL_VERSION + 
                                  ' already installed in ' + 
                                  path.join(ATOM_SHELL_PATH),
                                  'bootstrap:already_installed'));
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

// ### inject_wrapper
//
// Injects the node-shell wrapper app as atom-shell default app
var inject_wrapper = function(cb_) {
  console.log('Injecting node-shell wrapper');
  if(os.type().toLowerCase() === 'linux') {
    async.series([
      function(cb_) {
        fs.remove(path.join(ATOM_SHELL_PATH, 
                            'resources', 'default_app'), cb_);
      },
      function(cb_) {
        fs.copy(WRAPPER_PATH, 
                path.join(ATOM_SHELL_PATH, 'resources', 'default_app'), 
                cb_);
      }
    ], cb_);
  }
  /*
  else if(os.type().toLowerCase() === 'darwin') {
  }
  */
  else {
    return cb_(common.err('Wrapper injection not supported on: ' +
                          os.type().toLowerCase(),
                          'boostrap:injection_not_supported'));
  }
};


/******************************************************************************/
/* MAIN */
/******************************************************************************/
var argv = require('optimist')
.usage('Usage: $0 [-f]')
.argv;

async.series([
  function(cb_) {
    install_atom_shell(argv.f || false, function(err) {
      if(err && err.name === 'bootstrap:already_installed') {
        console.log(err.message);
        return cb_();
      }
      return cb_(err);
    });
  },
  function(cb_) {
    inject_wrapper(cb_);
  }
], function(err) {
  if(err) {
    common.fatal(err);
  }
  console.log('Done!');
  process.exit(0);
});

