/*
 * node-shell: [wrapper] index.js
 *
 * Copyright (c) 2014, Stanislas Polu. All rights reserved.
 *
 * @author: spolu
 *
 * @log:
 * - 2014-07-18 spolu   Creation
 */
"use strict"

var common = require('./lib/common.js');
var async = require('async');

var path = require('path');
var dnode = require('dnode');
var net = require('net');

/* atom-shell API */
var app = require('app');
var Menu = require('menu');
var MenuItem = require('menu-item');
var BrowserWindow = require('browser-window');



var atom_sock = process.argv[1];
var node_sock = process.argv[2];


var registry = {};
var salt = Date.now().toString();
var count = 0;

var next_id = function() {
  return salt + '-' + (++count);
};


var server = net.createServer(function(c) {
  var rpc_srv = dnode({
    create: function(type, args, cb_) {
      if(type === 'BrowserWindow') {
        var object_id = next_id();
        registry[object_id] = {
          type: type,
          object: new BrowserWindow(args[0])
        };
        return cb_(null, object_id);
      }
    },
    call: function(object_id, method, args, cb_) {
      if(registry[object_id]) {
        registry[object_id].object[method].apply(registry[object_id].object, args);
        return cb_();
      }
    }
  }, { weak: false });
  c.pipe(rpc_srv).pipe(c);
});

server.listen(atom_sock);


app.on('ready', function() {

  var d = dnode({}, { weak: false });
  d.on('remote', function (remote) {
    common.log.out('node-shell > wrapper [' + process.pid + ']');
    remote.handshake();
    /*
    remote.loopback('foo', function(err, s) {
      common.log.out('loopback replied : ' + s);
      //d.end();
    });
    */
  });

  var c = net.connect(node_sock);
  c.pipe(d).pipe(c);
});
