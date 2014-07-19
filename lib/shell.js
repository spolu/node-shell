/*
 * node-shell: shell.js
 *
 * Copyright (c) 2014, Stanislas Polu. All rights reserved.
 *
 * @author: spolu
 *
 * @log:
 * - 2014-07-18 spolu  Creation
 */
"use strict"

var common = require('./common.js');
var async = require('async');
var path = require('path');
var os = require('os');


// ## shell
//
// Main node-shell entry point. See `spawn_shell` method.
//
// ```
// @spec {}
// @inherits {}
// ```
var shell = function(spec, my) {
  var _super = {};
  my = my || {};
  spec = spec || {};

  my.ATOM_SHELL_PATH = path.join(__dirname, '..', 'vendor', 'atom-shell');
  my.ATOM_SHELL_EXEC = {
    'linux': path.join(my.ATOM_SHELL_PATH, 'atom'),
    'darwin': path.join(my.ATOM_SHELL_PATH,
                        'Atom.app', 'Contents', 'MacOs', 'Atom'),
  }

  //
  // #### _public_
  //
  var spawn_shell;             /* spawn(cb_); */

  //
  // #### _private_
  //
  
  //
  // #### _that_
  //
  var that = {};

  /****************************************************************************/
  /* PRIVATE HELPERS */
  /****************************************************************************/

  /****************************************************************************/
  /* PUBLIC METHODS */
  /****************************************************************************/
  // ### spawn_shell
  //
  // Spawns a new `atom-shell` instace and returns an associated `api` object
  // to access its browser-side API. The `api` object communicates with the
  // shell process using unix domain socket.
  //
  // This method can be called multiple times to spawn different instances.
  // ```
  // @cb_ {function(err, process, api)}
  // ```
  spawn_shell = function(cb_) {
    if(!my.ATOM_SHELL_EXEC[os.type().toLowerCase()]) {
      return cb_(common.err('Platform not supported: ' + 
                            os.type().toLowerCase(),
                            'shell:platform_not_supported'));
    }

    require('./api.js').api({}).init(function(err, api) {
      var p = require('child_process').spawn(
        my.ATOM_SHELL_EXEC[os.type().toLowerCase()],
        [api.atom_sock(), api.node_sock()], { stdio: 'inherit' });

      api.on('ready', function() {
        return cb_(null, p, api);
      });
    });
  };

  common.method(that, 'spawn_shell', spawn_shell, _super);

  return that;
};

exports.shell = shell;
