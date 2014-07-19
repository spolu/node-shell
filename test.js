var shell = require('./index.js');
var common = require('./lib/common.js');

shell.spawn_shell(function(err, p, api) {
  console.log('READY');
  //p.kill();
  var win = new api.BrowserWindow({
    width: 1200,
    height: 768
  });
  win.loadUrl('http://google.com');
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
