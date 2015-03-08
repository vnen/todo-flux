/*globals BOOTSTRAP:true */
var Backbone = require('backbone'),
    bootstrap = require('../bootstrap'),
    BaseCollection;

module.exports = BaseCollection = Backbone.Collection.extend({
  url: function () {
    return 'http://localhost:8082/api' + this.path;
  },
  path: '',
  bootstrap: function () {
    if (typeof window === 'undefined') {
      this.reset(bootstrap[this.name]);
    } else {
      if (typeof BOOTSTRAP !== 'undefined' && BOOTSTRAP && BOOTSTRAP[this.name]) {
        return this.reset(bootstrap[this.name]);
      }
      this.on('reset add remove', function () {
        BOOTSTRAP = BOOTSTRAP || {};
        BOOTSTRAP[this.name] = this.toJSON();
      }, this);
    }
  }
});
