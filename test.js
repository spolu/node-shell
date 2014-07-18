var shell = require('./index.js');

shell.spawn_shell(function(err, p, api) {
  console.log('done');
  //p.kill();
});
