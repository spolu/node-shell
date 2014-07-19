/*
 * node-shell: api.Base.js
 *
 * Copyright (c) 2014, Stanislas Polu. All rights reserved.
 *
 * @author: spolu
 *
 * @log:
 * - 2014-07-18 spolu  Creation
 */
"use strict"

var events = require('events');
var util = require('util');

function Base(api, type, args) {
  events.EventEmitter.call(this);

  console.log('Base Constructor');
  console.log(this);
  console.log(api);
  console.log(type);
  console.log(args);
  console.log('---');

  this.api = api;
  this.type = type;
  this.object_id = null;

  var that = this;
  this.api.create(type, this, args, function(err, object_id) {
    console.log('Base ' + type + ' [' + object_id + ']');
    that.object_id = object_id;
    that.emit('_ready');
  });
};

util.inherits(Base, events.EventEmitter);

Base.prototype.pre = function pre(cb_) {
  var that = this;
  if(!that.object_id) {
    that.on('_ready', function() {
      return cb_();
    });
  }
  else {
    return cb_();
  }
};

Base.prototype.call = function call(method, args, cb_) {
  var that = this;
  that.pre(function() {
    that.api.call(that.object_id, method, args, cb_);
  });
};

exports.Base = Base;
