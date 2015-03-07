var Backbone = require('backbone');

module.exports = Backbone.Router.extend({
  initialize: function () {
    this.route('', 'home');
    this.route('/', 'home');
  },
  home: function () {
    return 'Hello world';
  }
});
