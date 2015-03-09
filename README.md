# Todo Flux

A sample todo (kinda like [TodoMVC](http://todomvc.com/)) webapp in isomorphic Javascript made with React.js, Backbone.js and Flux architecture.

Ispired by: http://jsforallof.us/2015/02/23/isomorphic-web-apps-and-react-js/

This is a test to grasp concepts and use it on the [next version of Writer's Trail](https://github.com/flikore/writerstrail-mediator).

## Requirements

* [io.js](https://iojs.org)
  * May work with [Node.js](http://nodejs.org) >= 0.11.16 with `--harmony-generators` flag.
* GNU make or compatible (optional, for scripts only).

## Running

```shell
git clone https://github.com/vnen/todo-flux.git
cd todo-flux
make dep
make browserify
make start
```

Or, if you don't have make:

```shell
git clone https://github.com/vnen/todo-flux.git
cd todo-flux
npm install
./node_modules/.bin/browserify assets/main.js -o public/js/app.js
node index.js
```

## Testing

```
make test
```

## License

MIT
