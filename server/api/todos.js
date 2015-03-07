var _ = require('underscore'),
    todos = [
      {
        id: 1,
        task: 'Do something',
        done: true
      },
      {
        id: 2,
        task: 'Do something else',
        done: false
      }
    ];

function *getTodos() {
  this.body = todos;
}

function *getSingleTodo() {
  var todo = _.findWhere(todos, { id: parseInt(this.params.id, 10) });
  if (todo) {
    this.body = todo;
  } else {
    this.status = 404;
    this.body = {
      error: 'Todo not found'
    };
  }
}

module.exports = {
  getAll: getTodos,
  getOne: getSingleTodo
};
