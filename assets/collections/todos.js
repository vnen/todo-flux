var BaseCollection = require('./base'),
    _ = require('underscore'),
    TodoConstants = require('../constants/todos'),
    TodosCollection;

module.exports = TodosCollection = BaseCollection.extend({
  name: 'todos',
  path: '/todos',
  dispatchCallback: function (payload) {
    var todo = payload.todo,
        index = this.indexOf(todo);

    switch (payload.actionType) {
      case TodoConstants.addTodo: {
        this.add(todo);
        break;
      }
      case TodoConstants.removeTodo: {
        // Only if in this collection
        if (index >= 0) {
          todo.destroy({
            error: function () {
              this.add(todo);
              todo.trigger('deleteError', todo, { error: 'Error on delete' });
            }.bind(this)
          });
        }
        break;
      }
      case TodoConstants.saveTodo: {
        // Only if in this collection
        if (index >= 0) {
          todo.save(payload.todo.attributes, _.extend(payload.options, {
            error: function () {
              todo.set(todo.previousAttributes());
              todo.trigger('saveError', todo, { error: 'Error on save' });
            }
          }));
        }
        break;
      }
    }
  }
});
