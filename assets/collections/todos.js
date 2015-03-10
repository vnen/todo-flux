var BaseCollection = require('./base'),
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
            }.bind(this)
          });
        }
        break;
      }
      case TodoConstants.saveTodo: {
        todo = this.findWhere({ id: payload.todo.get('id') });
        if (todo) {
          todo.save(payload.todo.attributes, payload.options || {});
        }
        break;
      }
    }
  }
});
