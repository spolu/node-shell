node-shell
==========

`node-shell` lets you create cross-platform native GUI apps based on [atom-shell](https://github.com/atom/atom-shell),
straight out of the box from NodeJS, with no dependency or build phase required.

### Try it yourself

```
$ npm intsall node-shell
$ node
> require('node-shell').spawn_shell(function(err, p, api) { 
    new api.BrowserWindow('http://google.com'); 
  });
```
This works out of the box on `Windows`, `OSX` and `Linux` with a vanilla nodeJS installation.

### Implementation details

When `npm install` is invoked, `node-shell` downloads a packaged release of `atom-shell`
for the current platform and replaces the default app with a wrapper that exposes the 
`atom-shell` API through RPC on local unix domain sockets.

Using the `node-shell` library, node apps can create rich native apps powered by `atom-shell`,
without the need to build or rebuild anything (including native addons).

When spawning a new shell from your module, the `node-shell` library spawns an `atom-shell`
running the wrapper app and opens an RPC channel with it to let you interact with the API.

```
      +-------------------------+           +-----------------------+
      |          node           |           |       atom-shell      |
      +--------------------------           +-----------------------+
      +--------+   +------------+  spawms   +---------+  +----------+
      |  your  +-+-+ node-shell | --------> | wrapper +--+   atom   |
      | app.js | | |            |<--------->|   app   |  |   API    |
      +--------+ | +------------+    RPC    +---------+  +----+-----+
                 | +------------+                +--------+---+
                 +-+ other deps |                |        |       
                   +------------+            +---+--+ +---+--+ 
                        ...                  | winA | | winB |   ...
                                             +------+ +------+
```
