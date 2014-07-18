node-shell
==========

`node-shell` lets you create native GUI apps based on [atom-shell](https://github.com/atom/atom-shell),
directly from NodeJS. It works out of the box and without specific requirement
on Linux, OSX and Windows.

### Try it yourself

```
$ npm intsall node-shell
$ node
> require('node-shell').spawn_shell(function(err, p, api) { 
    new api.BrowserWindow('http://google.com'); 
  });
```

