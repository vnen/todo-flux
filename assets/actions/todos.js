var Dispatcher = require('../dispatcher'),
    TodoConstants = require('../constants/todos'),
    TodoActions;

TodoActions = {
  save: function (todo) {
    Dispatcher.dispatch({
      actionType: TodoConstants.saveTodo,
      todo: todo,
      options: {
        wait: true
      }
    });
  },
  done: function (todo, done) {
    todo.set('done', done);
    Dispatcher.dispatch({
      actionType: TodoConstants.saveTodo,
      todo: todo,
      options: {
        wait: true
      }
    });
  },
  remove: function (todo) {
    Dispatcher.dispatch({
      actionType: TodoConstants.removeTodo,
      todo: todo
    });
  },
  revert: function (todo) {
    todo.set(todo.previousAttributes());
  }
};

module.exports = TodoActions;
