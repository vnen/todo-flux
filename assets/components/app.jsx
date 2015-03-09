var React = require('react'),
    _ = require('underscore'),
    HeaderComponent = require('./header.jsx'),
    AppComponent;

AppComponent = React.createClass({
  render: function () {
    if (this.props.collections) {
      _.each(this.props.collections, function (collection) {
        collection.bootstrap();
      }, this);
    }
    return (
      <div>
        <HeaderComponent />
        {this.props.component && <this.props.component collections={this.props.collections} />}
      </div>
    );
  }
});

module.exports = AppComponent;
