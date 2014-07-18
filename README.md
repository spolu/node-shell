node-shell
==========

`node-shell` lets you create native GUI apps natively form nodeJS.
It is based on [atom-shell](https://github.com/atom/atom-shell).
It is cross-platform and works out of the box on Linux, MacOSX and Windows.

### Try it yourself

```
$ npm intsall node-shell
$ node
> require('node-shell').spawn_shell(function(err, p, api) { 
    new api.BrowserWindow('http://google.com'); 
  });
```

