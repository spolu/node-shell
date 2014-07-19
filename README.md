node-shell
==========

`node-shell` lets you create cross-platform native GUI apps based on [atom-shell](https://github.com/atom/atom-shell),
straight out of the box from NodeJS, with no dependency or build phase required.

### Try it yourself right now

```
$ npm install node-shell
$ node
> require('node-shell').spawn_shell(function(err, p, api) { 
    var win = new api.BrowserWindow({
      width: 1200,
      height: 768
    });
    win.loadUrl('http://google.com');
  });
```
This works out of the box on `Windows`, `OSX` and `Linux` with vanilla nodeJS installations.

### Implementation details

When `npm install` is invoked, `node-shell` downloads a packaged release of `atom-shell`
for the current platform and replaces the default app with a wrapper that exposes the 
`atom-shell` API through (json)RPC over UNIX sockets.

Using the `node-shell` library, node apps can create rich native apps powered by `atom-shell`,
without the need to build or rebuild anything (including native addons).

When spawning a new shell from your module, the `node-shell` library spawns an `atom-shell`
running the wrapper app and opens an RPC channel with it to let you interact with the API.

```
  +-------------------------+            +-----------------------+
  |          node           |            |       atom-shell      |
  +--------------------------            +-----------------------+
  +--------+   +------------+            +---------+  +----------+
  |        | +-+ node-shell | <--------> | wrapper +--+   atom   |
  |        | | +------------+     RPC    |   app   |  |   api    |
  |  your  +-+                           +---------+  +----+-----+
  | app.js | | +------------+                 +--------+---+
  |        | +-+ other deps |                 |        |       
  |        |   +------------+             +---+--+ +---+--+ 
  |        |        ...                   | winA | | winB |   ...
  +--------+                              +------+ +------+
```
