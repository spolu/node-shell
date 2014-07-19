var common = require('./lib/common.js');

require('./index.js')(function(err, api) {
  var win = new api.BrowserWindow({}).loadUrl('http://google.com');
});

// SAFETY NET (kills the process and the spawns)
process.on('uncaughtException', function (err) {
  common.fatal(err);
});

var sig_handler = function() {
  common.exit(0);
};
process.on('SIGHUP', sig_handler);
process.on('SIGINT', sig_handler);
process.on('SIGQUIT', sig_handler);
process.on('SIGABRT', sig_handler);
process.on('SIGTERM', sig_handler);
