node-shell
==========

`node-shell` lets you create native GUI apps based on [atom-shell](https://github.com/atom/atom-shell),
directly from NodeJS. It works out of the box, on Linux, OSX and Windows, without no required dependency or build phase.

### Try it yourself

```
$ npm intsall node-shell
$ node
> require('node-shell').spawn_shell(function(err, p, api) { 
    new api.BrowserWindow('http://google.com'); 
  });
```

### Implementation details

When `npm install` is invoked, `node-shell` downloads a package release of `atom-shell`
for the current platform and replaces the default app by a wrapper that exposes the 
`atom-shell` API through RPC on unix domain sockets.

Using the `node-shell` library, node apps can create GUI windows powered by the 
`atom-shell` API, that work cross-platform.

### List of apps/modeuls using `node-shell`
