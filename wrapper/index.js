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

/* atom-shell API */
var app = require('app');
var Menu = require('menu');
var MenuItem = require('menu-item');
var BrowserWindow = require('browser-window');

app.on('ready', function() {

});
