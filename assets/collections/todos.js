var BaseCollection = require('./base'),
    TodosCollection;

module.exports = TodosCollection = BaseCollection.extend({
  path: '/todos'
});
