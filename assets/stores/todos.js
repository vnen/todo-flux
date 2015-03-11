var $ = require('jquery'),
    TodoCollection = require('../collections/todos'),
    TodosStore = module.exports = new TodoCollection();

if (typeof window !== 'undefined') {
  $(function () {
    console.log('bootstrapping');
    TodosStore.bootstrap();
  });
}
