var BaseCollection = require('./base'),
    TodosCollection;

module.exports = TodosCollection = BaseCollection.extend({
  name: 'todos',
  path: '/todos'
});
