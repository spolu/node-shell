node-shell
==========

`node-shell` lets you create cross-platform native GUI apps based on [atom-shell](https://github.com/atom/atom-shell),
directly from NodeJS. It no particular dependency or build phase.

### Try it yourself

```
$ npm intsall node-shell
$ node
> require('node-shell').spawn_shell(function(err, p, api) { 
    new api.BrowserWindow('http://google.com'); 
  });
```
This works out of the box on Windows, OSX and Linux with vaniall nodeJS installations.

### Implementation details

When `npm install` is invoked, `node-shell` downloads a package release of `atom-shell`
for the current platform and replaces the default app by a wrapper that exposes the 
`atom-shell` API through RPC on unix domain sockets.

Using the `node-shell` library, node apps can create native apps powered by `atom-shell`,
without the need to rebuild native addons against new binaries, straight out of nodeJS.

### Packaging apps

`node-shell` also provide scripts to package apps based on it into native apps ready
to be distributed to end-users.

### List of apps/modeuls using `node-shell`
