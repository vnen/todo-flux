/*globals BOOTSTRAP:true */
var Backbone = require('backbone'),
    BaseCollection;

module.exports = BaseCollection = Backbone.Collection.extend({
  url: function () {
    return 'http://localhost:8082/api' + this.path;
  },
  path: '',
  bootstrap: function () {
    if (typeof window !== 'undefined') {
      this.off('reset add remove', this.updateCache, this);
      this.on('reset add remove', this.updateCache, this);
      if (typeof BOOTSTRAP !== 'undefined' && BOOTSTRAP && typeof BOOTSTRAP[this.name] !== 'undefined') {
        return this.reset(BOOTSTRAP[this.name]);
      }
      this.fetch({ reset: true });
    }
  },
  updateCache: function () {
    BOOTSTRAP = BOOTSTRAP || {};
    BOOTSTRAP[this.name] = this.toJSON();
  }
});
