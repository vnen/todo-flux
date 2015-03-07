var Backbone = require('backbone'),
    BaseCollection;

module.exports = BaseCollection = Backbone.Collection.extend({
  url: function () {
    return 'http://localhost:8082/api' + this.path;
  },
  path: ''
});
