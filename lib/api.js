/*
 * node-shell: api.js
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

var dnode = require('dnode');
var async = require('async');
var path = require('path');
var os = require('os');
var net = require('net');
var events = require('events');
var util = require('util');


// ## api
// 
// Object in charge of RPC with the wrapper process as well as exposing the
// api components.
//
// ```
// @spec {}
// @inherits {}
// ```
var api = function(spec, my) {
  var _super = {};
  my = my || {};
  spec = spec || {};

  my.salt = Date.now().toString();
  my.count = 0;

  //
  // #### _public_
  //
  var next_id;            /* next_id(); */

  var create;             /* create(type, object, args, cb_); */
  var call;               /* create(object_id, methods, args, cb_); */

  var init;               /* init(cb_); */
  var handshake;          /* handshake(child, cb_); */


  //
  // #### _private_
  //
  
  //
  // #### _that_
  //
  var that = new events.EventEmitter();

  /****************************************************************************/
  /* PRIVATE HELPERS */
  /****************************************************************************/
  // ### handshake
  //
  // RPC called when the wrapper connects to my.rpc_srv
  handshake = function() {
    my.rpc_cli = dnode({}, { weak: false });
    my.rpc_cli.on('remote', function (remote) {
      my.remote = remote;
      common.log.out('node-shell < wrapper');
      that.emit('ready');
    });

    var c = net.connect(my.atom_sock);
    c.pipe(my.rpc_cli).pipe(c);
  };


  /****************************************************************************/
  /* PUBLIC METHODS */
  /****************************************************************************/
  // ### next_id
  //
  // Returns a new unique id
  next_id = function() {
    return my.salt + '-' + (++my.count);
  };

  // ### create
  //
  // RPC to create a remote API object
  // ```
  // @type {string} the object type
  // @obj  {object} the local object
  // @args {array} the array of constructors arguments
  // @cb_  {function(err)}
  // ```
  create = function(type, object, args, cb_) {
    my.remote.create(type, args, cb_);
  };

  // ### call
  //
  // RPC to call a remote API object method
  // ```
  // @object_id {string} the object_id
  // @method    {string} the method name
  // @args      {array} the arguments array
  // @cb_       {function(err, ...)}
  // ```
  call = function(object_id, method, args, cb_) {
    console.log('CALL: ' + object_id + ' ' + method + ' ' + args);
    my.remote.call(object_id, method, args, cb_);
  }


  // ### init
  //
  // Initializes the API and opens the JSON RPC channel
  // ```
  // @cb_ {function(err, api)}
  // ```
  init = function(cb_) {
    var now = Date.now();

    if (os.platform() === 'win32') {
      my.node_sock = '\\\\.\\pipe\\' + next_id() + '-node.sock';
      my.atom_sock = '\\\\.\\pipe\\' + next_id() + '-atom.sock';
    } else {
      my.node_sock = path.join(os.tmpdir(),
                               'node-shell.' + next_id() + '-node.sock');
      my.atom_sock = path.join(os.tmpdir(),
                               'node-shell.' + next_id() + '-atom.sock');
    }

    my.server = net.createServer(function(c) {
      my.rpc_srv = dnode({
        handshake: handshake,
        loopback: function(s, cb_) {
          return cb_(null, s);
        }
      }, { weak: false });
      c.pipe(my.rpc_srv).pipe(c);
    });

    /* BrowserWindow */
    var BrowserWindow = require('./api.BrowserWindow.js').BrowserWindow;
    that.BrowserWindow = function(options) {
      BrowserWindow.call(this, that, options);
    };
    util.inherits(that.BrowserWindow, BrowserWindow);

    my.server.listen(my.node_sock);
    return cb_(null, that);
  };

  common.getter(that, 'atom_sock', my, 'atom_sock');
  common.getter(that, 'node_sock', my, 'node_sock');

  common.method(that, 'next_id', next_id, _super);

  common.method(that, 'create', create, _super);
  common.method(that, 'call', call, _super);

  common.method(that, 'init', init, _super);
  common.method(that, 'handshake', handshake, _super);

  return that;
}

exports.api = api;
