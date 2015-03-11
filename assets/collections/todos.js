var BaseCollection = require('./base'),
    _ = require('underscore'),
    TodoConstants = require('../constants/todos'),
    TodosCollection;

module.exports = TodosCollection = BaseCollection.extend({
  name: 'todos',
  path: '/todos',
  dispatchCallback: function (payload) {
    var todo;
    switch (payload.actionType) {
      case TodoConstants.addTodo: {
        this.add(payload.todo);
        break;
      }
      case TodoConstants.removeTodo: {
        todo = this.findWhere({ id: payload.todo.get('id') });
        if (todo) {
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
        todo = this.findWhere({ id: payload.todo.get('id') });
        if (todo) {
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
