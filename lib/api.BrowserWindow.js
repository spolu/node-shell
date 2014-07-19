/*
 * node-shell: api.BrowserWindow.js
 *
 * Copyright (c) 2014, Stanislas Polu. All rights reserved.
 *
 * @author: spolu
 *
 * @log:
 * - 2014-07-18 spolu  Creation
 */
"use strict"

var util = require('util');

function BrowserWindow(api, options) {
  console.log('BrowserWindow Constructor');
  console.log(this);
  console.log(api);
  console.log(options);
  console.log('---');

  require('./api.Base.js').Base.call(this, api, 'BrowserWindow', [options]);
};

util.inherits(BrowserWindow, require('./api.Base.js').Base);

BrowserWindow.prototype.loadUrl = function loadUrl(url) {
  this.call('loadUrl', [url], function() {});
};

BrowserWindow.prototype.show = function show(url) {
  this.call('show', [], function() {});
};

exports.BrowserWindow = BrowserWindow;

