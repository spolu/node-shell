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
var common = require('./common');

function BrowserWindow(api, options) {
  require('./api.Base.js').Base.call(this, api, 'BrowserWindow', [options]);
  this.options = options;
};

util.inherits(BrowserWindow, require('./api.Base.js').Base);

BrowserWindow.prototype.loadUrl = function loadUrl(url, cb) {
  this.call('loadUrl', [url], cb || common.noop);
  return this;
};

BrowserWindow.prototype.show = function show(cb) {
  this.call('show', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.getAllWindows = function getAllWindows(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('getAllWindows requires a callback');
  this.call('getAllWindows', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.fromId = function fromId(id, cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('fromId requires a callback');
  this.call('fromId', [id], cb || common.noop);
  return this
};

/*
Not Yet Implmented requires webcontents;

*/
BrowserWindow.prototype.fromWebContents = function (webContents, cb) {
  throw new Error('Not Yet Implemented');
};

BrowserWindow.prototype.webContents = function (cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('webContents requires a callback');
  this.call('webContents', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.devToolsWebContents = function (cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('devToolsWebContents requires a callback');
  this.call('devToolsWebContents', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.getFocusedWindow = function getFocusedWindow(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('getFocusedWindow requires a callback');
  this.call('getFocusedWindow', [], cb || common.noop);
  return this;
}

BrowserWindow.prototype.hide = function hide(cb) {
  this.call('hide', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.onEvent = function onEvent(event, cb) {
  this.call('on', [event], cb || common.noop);
  return this;
};

BrowserWindow.prototype.toggleDevTools = function toggleDevTools(cb) {
  this.call('toggleDevTools', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.openDevTools = function openDevTools(cb) {
  this.call('openDevTools', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.closeDevTools = function closeDevTools(cb) {
  this.call('closeDevTools', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.setFullScreen = function setFullScreen(flag, cb) {
  this.call('setFullScreen', [flag], cb || common.noop);
  return this;
};

BrowserWindow.prototype.isFullScreen = function isFullScreen(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error ('isFullScreen requires a callback');
  this.call('isFullScreen', [], cb);
  return this;
};

BrowserWindow.prototype.id = function id(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error ('id requires a callback');
  this.call('id', [], cb )
  return this;
};

BrowserWindow.prototype.destroy = function destroy(cb) {
  this.call('destroy', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.close = function close(cb) {
  this.call('close', [], cb || common.noop)
  return this;
};

BrowserWindow.prototype.focus = function focus(cb) {
  this.call('focus', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.isFocused = function isFocused(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('isFocused requires a callback');
  this.call('isFocused', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.isVisible = function isVisible(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error ('isVisible requires a callback');
  this.call('isVisible', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.maximize = function maximize(cb) {
  this.call('maximize', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.unmaximize = function unmaximize(cb) {
  this.call('unmaximize', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.isMaximized = function isMaximized(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('isMaximized required a callback');
  this.call('isMaximized', [], cb || common.noop);
};

BrowserWindow.prototype.minimize = function minimize(cb) {
  this.call('minimize', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.restore = function restore(cb) {
  this.call('restore', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.setSize = function setSize(width, height, cb) {
  this.call('setSize', [width, height], cb || common.noop);
  return this;
};

BrowserWindow.prototype.getSize = function getSize(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('getSize requires a callback');
  this.call('getSize', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.setContentSize = function setContentSize(width, height, cb) {
  this.call('setContentSize', [width, height], cb || common.noop);
  return this;
};

BrowserWindow.prototype.getContentSize = function getContentSize(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('getContentSize requires a callback');
  this.call('getContentSize', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.setMinimumSize = function setMinimumSize(width, height, cb) {
  this.call('setMinimumSize', [width, height], cb || common.noop);
  return this;
};

BrowserWindow.prototype.getMinimumSize = function getMinimumSize(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('getMinimumSize requires a callback');
  this.call('getMinimumSize', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.setMaximumSize = function setMaximumSize(width, height, cb) {
  this.call('setMaximumSize', [width,height], cb || common.noop);
  return this;
};

BrowserWindow.prototype.getMaximumSize = function getMaximumSize(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('getMaximumSize requires a callback');
  this.call('getMaximumSize', [], cb || common.noop);
};

BrowserWindow.prototype.setResizable = function setResizable(flag, cb) {
  this.call('setResizable', [flag], cb || common.noop);
  return this;
};

BrowserWindow.prototype.setAlwaysOnTop = function setAlwaysOnTop(flag, cb) {
  this.call('setAlwaysOnTop', [flag], cb || common.noop);
  return this;
};

BrowserWindow.prototype.isAlwaysOnTop = function isAlwaysOnTop(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('isAlwaysOnTop requires a callback');
  this.call('isAlwaysOnTop', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.center = function center(cb) {
  this.call('center', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.setPosition = function setPosition(x, y, cb) {
  this.call('setPosition', [x,y], cb || common.noop);
  return this;
};

BrowserWindow.prototype.getPosition = function getPosition(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('getPosition requires a callback');
  this.call('getPosition', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.getTitle = function getTitle(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('getTitle requires a callback');
  this.call('getTitle', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.flashFrame = function flashFrame(cb) {
  this.call('flashFrame', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.setSkipTaskbar = function setSkipTaskbar(flag, cb) {
  this.call('setSkipTaskbar', [flag], cb || common.noop);
  return this;
};

BrowserWindow.prototype.setKiosk = function setKiosk(flag, cb) {
  this.call('setKiosk', [flag], cb || common.noop);
  return this;
};

BrowserWindow.prototype.isKiosk = function isKiosk(cb) {
  if (cb === undefined && this.options.strictApi) throw new Error('isKiosk requires a callback');
  this.call('isKiosk', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.setRepresentedFilename = function setRepresentedFilename(cb) {
  this.call('setRepresentedFilename', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.setDocumentEdited = function setDocumentEdited(flag, cb) {
  this.call('setDocumentEdited', [flag], cb || common.noop);
  return this;
};

BrowserWindow.prototype.inspectElement = function inspectElement(x, y, cb) {
  this.call('inspectElement', [x,y], cb || common.noop);
  return this;
};

BrowserWindow.prototype.focusOnWebView = function focusOnWebView() {
  this.call('focusOnWebView', [], cb || common.noop);
  return this;
};

BrowserWindow.prototype.blurWebView = function blurWebView() {
  this.call('blurWebView', [], cb || common.noop);
  return this;
};


/**
Requires custom logic needed to handle the callback nature of this request
**/
BrowserWindow.prototype.capturePage = function capturePage() {
  throw new Error('Not Yet Implmeneted');
};

BrowserWindow.prototype.reload = function reload() {
  this.call('reload', [], common.noop);
  return this;
};

/**
Requires implemenation of menu
**/
BrowserWindow.prototype.setMenu = function setMenu(menu, cb) {
  throw new Error('Not Yet Implemented');
};


exports.BrowserWindow = BrowserWindow;
