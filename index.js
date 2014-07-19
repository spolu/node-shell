/*
 * node-shell: index.js
 *
 * Copyright (c) 2014, Stanislas Polu. All rights reserved.
 *
 * @author: spolu
 *
 * @log:
 * - 2014-07-18 spolu   Creation
 */
"use strict"

module.exports = require('./lib/shell.js').shell({}).spawn_shell;
