var Backbone = require('backbone'),
    Route = require('../../lib/route'),
    HomeComponent = require('../components/home.jsx');

module.exports = Backbone.Router.extend({
  initialize: function () {
    this.route('', 'home');
    this.route('/', 'home');
  },
  home: function () {
    return new Route(HomeComponent);
  }
});
